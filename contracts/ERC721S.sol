// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

/**
 * @dev Implementation of https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard, including
 * the Metadata extension. Implemented to optimize for lower gas fees during a batch mint with an arbitrary start.
 *
 * Assumes tokens are minted sequentially (1,2,3...n).
 *
 * Assumes an initial sequence is used.
 * 
 * Assumes initial sequence starts arbitrarily between [1-n].
 *
 * Does not support the ability to burn tokens.
 */
contract ERC721S is Context, ERC165, IERC721, IERC721Metadata {
    using Address for address;
    using Strings for uint256;

    uint256 internal immutable MAX_SUPPLY;
    uint256 internal immutable MAX_MINT;

    struct Owner {
        address _owner;
        address _approvals;
    }

    string _name;
    string _symbol;

    struct Balance {
        uint128 _balance;
    }

    mapping(uint16 => Owner) private _owners;

    // Mapping owner address to token count
    mapping(address => Balance) private _balances;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    constructor(string memory name_, string memory symbol_, uint256 max_supply_, uint256 max_mint_) {
        _name = name_;
        _symbol = symbol_;
        MAX_SUPPLY = max_supply_;
        MAX_MINT = max_mint_;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IERC721-balanceOf}.
     */
    function balanceOf(address owner) public view virtual override returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");
        return _balances[owner]._balance;
    }

    /**
     * @dev built to retrieve the owner for batch mint.
     *
     * Assumes number sequence begins at from [1-n].
     */
    function ownerOf(uint256 tokenId) public view virtual override returns (address) {
        require(_exists(uint16(tokenId)),"ERC721S: Owner query for nonexistent token");

        uint16 curToken = uint16(tokenId);
        uint16 _max_supply = uint16(MAX_SUPPLY);
        uint16 lowestTokenToCheck;
        bool boundsCheck = curToken > uint16(MAX_MINT) - 1;
        
        if(boundsCheck){
            lowestTokenToCheck = curToken - uint16(MAX_MINT) + 1;
        }else{
            lowestTokenToCheck = curToken == 1 ? _max_supply - 1 : _max_supply;
        }
        
        for(uint16 curr = boundsCheck ? curToken : _max_supply + curToken; curr >= lowestTokenToCheck; curr--){
            uint16 tokenToCheck = curr == _max_supply ? _max_supply : curr % _max_supply;
            address owner = _owners[tokenToCheck]._owner;
            if(owner != address(0)){
                return owner;
            }
        }

        revert("ERC721S: Unable to determine the owner of token");
    }

    /**
     * @dev See {IERC721Metadata-name}.
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev See {IERC721Metadata-symbol}.
     */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(uint16(tokenId)), "ERC721Metadata: URI query for nonexistent token");

        return "";
    }

    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overriden in child contracts.
     */
    function _baseURI() internal view virtual returns (string memory) {
        return "";
    }

    /**
     * @dev See {IERC721-approve}.
     */
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = ERC721S.ownerOf(uint16(tokenId));
        require(to != owner, "ERC721S: approval to current owner");

        require(
            _msgSender() == owner || isApprovedForAll(owner, _msgSender()),
            "ERC721S: approve caller is not owner nor approved for all"
        );

        _approve(to,uint16(tokenId),owner);
    }

    /**
     * @dev See {IERC721-getApproved}.
     */
    function getApproved(uint256 tokenId) public view virtual override returns (address) {
        require(_exists(uint16(tokenId)), "ERC721S: approved query for nonexistent token");

        return _owners[uint16(tokenId)]._approvals;
    }

    /**
     * @dev See {IERC721-setApprovalForAll}.
     */
    function setApprovalForAll(address operator, bool approved) public virtual override {
        require(operator != msg.sender, "ERC721S: must approve to caller");
        _setApprovalForAll(_msgSender(), operator, approved);
    }

    /**
     * @dev See {IERC721-isApprovedForAll}.
     */
    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    /**
     * @dev See {IERC721-transferFrom}.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), uint16(tokenId)), "ERC721S: transfer caller is not owner nor approved");

        _transfer(from, to, uint16(tokenId));
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        safeTransferFrom(from, to, uint16(tokenId), "");
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        require(_isApprovedOrOwner(_msgSender(), uint16(tokenId)), "ERC721S: transfer caller is not owner nor approved");
        _safeTransfer(from, to, uint16(tokenId), _data);
    }

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * `_data` is additional data, it has no specified format and it is sent in call to `to`.
     *
     * This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
     * implement alternative mechanisms to perform token transfer, such as signature-based.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeTransfer(
        address from,
        address to,
        uint16 tokenId,
        bytes memory _data
    ) internal virtual {
        _transfer(from, to, tokenId);
        require(_checkOnERC721Received(from, to, tokenId, _data), "ERC721S: transfer to non ERC721Receiver implementer");
    }

    /**
     * @dev Returns whether `tokenId` exists.
     *
     * Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
     *
     * Tokens start existing when they are minted (`_mint`),
     * and stop existing when they are burned (`_burn`).
     */
    function _exists(uint16) internal view virtual returns (bool) {
        return false;
    }

    function getInitialSequence() internal virtual view returns (uint16 a){
    }

    /**
     * @dev Returns whether `spender` is allowed to manage `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _isApprovedOrOwner(address spender, uint16 tokenId) internal view virtual returns (bool) {
        require(_exists(tokenId), "ERC721S: operator query for nonexistent token");
        address owner = ERC721S.ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }

    /**
     * @dev Safely mints `quantity` of tokens and transfers it to `to`.
     *
     * Requirements:
     *
     * - `quantity` must not be between [1-MAX_MINT].
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeMint(
        address to,
        uint16 quantity
    ) internal virtual {
        require(to != address(0), "ERC721S: Recipient cannot be the zero address.");
        
        _mint(to, quantity);
        
    }

    /**
     * @dev Mints `tokenId` and transfers it to `to`. Optimized for batch mint.
     *
     * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - `to` cannot be the zero address.
     *
     * Emits a {Transfer} event.
     * quantity must not exceed 2 ** 16 - 1
     */
    function _mint(address to, uint16 quantity) internal virtual {
        uint16 tokenId = getInitialSequence();
        require(to != address(0), "ERC721S: mint to the zero address");

        _beforeTokenTransfer(address(0), to, tokenId, quantity);

        _balances[to]._balance += uint128(quantity);
        _owners[tokenId]._owner = to;

        for(uint16 i = 0; i < quantity; i++){
            emit Transfer(address(0), to, tokenId);

            tokenId += 1;
            if(tokenId > uint16(MAX_SUPPLY)) tokenId = 1;
        }

        _afterTokenTransfer(address(0), to, tokenId, quantity);
    }

    /**
     * @dev Transfers `tokenId` from `from` to `to`. Optimized for batch mint.
     *  As opposed to {transferFrom}, this imposes no restrictions on msg.sender.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     * - `tokenId` must not exceed 2 ** 16 - 1
     *
     * Emits a {Transfer} event.
     */
    function _transfer(
        address from,
        address to,
        uint16 tokenId
    ) internal virtual {
        address prevOwner = ERC721S.ownerOf(tokenId);
        require(prevOwner == from, "ERC721S: transfer from incorrect owner");
        require(to != address(0), "ERC721S: transfer to the zero address");
        require(_exists(tokenId), "ERC721S: transfer a token that does not exist");

        _beforeTokenTransfer(from, to, tokenId, 1);

        // Clear approvals from the previous owner
        _approve(address(0), tokenId, prevOwner);

        // if tokenId == MAX_SUPPLY, get owner of tokenId 1. Otherwise get owner of tokenId + 1
        address ownerRight = tokenId == uint16(MAX_SUPPLY) ? _owners[1]._owner : _owners[tokenId + 1]._owner;

        // owner of tokenId + 1 is current owner, set tokenId + 1 to the from address
        if(ownerRight == address(0) && tokenId < uint16(MAX_SUPPLY) && _exists(tokenId + 1)){
            _owners[tokenId + 1]._owner = from;
        // owner of tokenId 1 is current owner, set tokenId 1 to the from address
        }else if(ownerRight == address(0) && tokenId == uint16(MAX_SUPPLY) && _exists(1)){
            _owners[1]._owner = from;
        }

        _balances[from]._balance -= 1;
        _balances[to]._balance += 1;
        _owners[tokenId]._owner = to;

        emit Transfer(from, to, tokenId);

        _afterTokenTransfer(from, to, tokenId, 1);
    }

    /**
     * @dev Approve `to` to operate on `tokenId`
     *
     * Emits a {Approval} event.
     */
    function _approve(address to, uint16 tokenId, address owner) internal virtual {
        _owners[tokenId]._approvals = to;
        emit Approval(owner, to, tokenId);
    }

    /**
     * @dev Approve `operator` to operate on all of `owner` tokens
     *
     * Emits a {ApprovalForAll} event.
     */
    function _setApprovalForAll(
        address owner,
        address operator,
        bool approved
    ) internal virtual {
        require(owner != operator, "ERC721S: approve to caller");
        _operatorApprovals[owner][operator] = approved;
        emit ApprovalForAll(owner, operator, approved);
    }

    /**
     * @dev Internal function to invoke {IERC721Receiver-onERC721Received} on a target address.
     * The call is not executed if the target address is not a contract.
     *
     * @param from address representing the previous owner of the given token ID
     * @param to target address that will receive the tokens
     * @param tokenId uint256 ID of the token to be transferred
     * @param _data bytes optional data to send along with the call
     * @return bool whether the call correctly returned the expected magic value
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) private returns (bool) {
        if (to.isContract()) {
            try IERC721Receiver(to).onERC721Received(_msgSender(), from, tokenId, _data) returns (bytes4 retval) {
                return retval == IERC721Receiver.onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert("ERC721S: transfer to non ERC721Receiver implementer");
                } else {
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint16 tokenId,
        uint256 quantity
    ) internal virtual {}

    /**
     * @dev Hook that is called after any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint16 tokenId,
        uint256 quantity
    ) internal virtual {}
}