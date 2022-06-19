import { BigInt } from "@graphprotocol/graph-ts"
import {
  PangolinExchange,
  PairCreated
} from "../generated/PangolinExchange/PangolinExchange"
import { Pair,Token } from "../generated/schema"
import {
  ERC20
} from "../generated/PangolinExchange/ERC20"
import { log } from '@graphprotocol/graph-ts'

export function handlePairCreatedPangolin(event: PairCreated): void {
    // Get All Event Parameters
    let _id = event.params.pair;
    let _tokenA = event.params.token0;
    let _tokenB = event.params.token1;
    let _exchange = "PangolinExchange";
    let _router = "";
    let _pairId = event.params.param3;
    log.debug("ID: {}\nTokenA: {}\nTokenB: {}\nPairID: {}", [_id.toHexString(),_tokenA.toHexString(),_tokenB.toHexString(),_pairId.toString()]);

    // // Create SwapPair Entity for TokenA
    // let swapPairA = SwapPair.load(_tokenA.toHexString());
    // if(!swapPairA) {
    //   swapPairA = new SwapPair(_tokenA.toHexString());
    // }
    // swapPairA.save();

    // // Create SwapPair Entity for TokenB
    // let swapPairB = SwapPair.load(_tokenB.toHexString());
    // if(!swapPairB) {
    //   swapPairB = new SwapPair(_tokenB.toHexString());
    // }
    // swapPairB.save();

    // Create Token Instance A
    let _erc20A = ERC20.bind(_tokenA);
    let _nameA = _erc20A.name();
    let _symbolA = _erc20A.symbol();
    let _decimalA = _erc20A.decimals();
    
    // Create Token A instance
    let tokenA =  Token.load(_tokenA.toHex());
    if(tokenA === null) {
      tokenA = new Token(_tokenA.toHex());
      tokenA.name = _nameA;
      tokenA.symbol = _symbolA;
      tokenA.decimal = BigInt.fromI64(_decimalA);
      // tokenA.tokenId = _tokenB.toHexString();
    }
    tokenA.save();

    // Create Token Instance B
    let _erc20B = ERC20.bind(_tokenB);
    let _nameB = _erc20B.name();
    let _symbolB = _erc20B.symbol();
    let _decimalB = _erc20B.decimals();
    
    // Create Token A instance
    let tokenB =  Token.load(_tokenB.toHex());
    if(tokenB === null) {
      tokenB = new Token(_tokenB.toHex());
      tokenB.name = _nameB;
      tokenB.symbol = _symbolB;
      tokenB.decimal =  BigInt.fromI64(_decimalB);
      // tokenB.tokenId = tokenA.id;
    }
    tokenB.save();

    // Create Token Pair
    let pair = Pair.load(_id.toHex());
    if(pair === null) {
      pair = new Pair(_id.toHex());
      pair.tokenA = _tokenA.toHexString();
      pair.tokenAEntity = tokenA.id;
      pair.tokenB = _tokenB.toHexString()
      pair.tokenBEntity = tokenB.id;
      pair.exchange = _exchange;
      pair.router = _router;
    }
    pair.save();
}
