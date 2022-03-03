import { cutDecimals } from "../helpers/utils/gas-module";
import { assetsReducer } from "./assetsReducer";

import ethLogo from "../../images/tokens/eth_logo.svg";
import usdcLogo from "../../images/tokens/usdc_logo.webp";
import daiLogo from "../../images/tokens/dai_logo.webp";

const emptyAccount = {
  account: {
    name: "Account",
    address: "0x6568a702Aaf7c9E6a26419E9d1042Cf62D067896",
    eth: {
      name: "ETH",
      balance: 0,
      logo: ethLogo,
    },
    assets: {
      DAI: { name: "DAI", balance: 0, logo: daiLogo },
      USDC: { name: "USDC", balance: 0, logo: usdcLogo },
    },
    transactions: [],
  },
};

let godInitialState = {
  account: {
    name: "Account",
    address: "0x6568a702Aaf7c9E6a26419E9d1042Cf62D067896",
    eth: {
      name: "ETH",
      balance: 999,
      logo: ethLogo,
    },
    assets: {
      DAI: { name: "DAI", balance: 999, logo: daiLogo },
      USDC: { name: "USDC", balance: 999, logo: usdcLogo },
    },
    transactions: [],
  },
};

let typicalAccount = {
  account: {
    name: "Account",
    address: "0x6568a702Aaf7c9E6a26419E9d1042Cf62D067896",
    eth: {
      name: "ETH",
      balance: 1,
      logo: ethLogo,
    },
    assets: {
      DAI: { name: "DAI", balance: 250, logo: daiLogo },
      USDC: { name: "USDC", balance: 250, logo: usdcLogo },
    },
    transactions: [],
  },
};

export function rootReducer(state = emptyAccount, action) {
  switch (action.type) {
    case "metamask/updateAssetBalance": {
      if (action.payload.asset === "ETH") {
        return rootReducer(state, {
          type: "metamask/updateETHBalance",
          payload: { change: action.payload.change },
        });
      } else {
        return {
          ...state,
          account: {
            ...state.account,
            assets: assetsReducer(state.account.assets, action),
          },
        };
      }
    }
    case "metamask/updateETHBalance": {
      return {
        ...state,
        account: {
          ...state.account,
          eth: {
            ...state.account.eth,
            balance: cutDecimals(
              state.account.eth.balance + action.payload.change
            ),
          },
        },
      };
    }
    case "metamask/emptyAccount": {
      return { ...state, ...emptyAccount };
    }
    case "metamask/godAccount": {
      return { ...state, ...godInitialState };
    }
    case "metamask/typicalAccount": {
      return { ...state, ...typicalAccount };
    }
    default:
      return state;
  }
}
