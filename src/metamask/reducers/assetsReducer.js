import { cutDecimals } from "../helpers/utils/gas-module";

export function assetsReducer(assets = {}, action) {
  switch (action.type) {
    case "metamask/updateAssetBalance": {
      return {
        ...assets,
        [action.payload.asset]: {
          ...assets[action.payload.asset],
          balance: cutDecimals(
            assets[action.payload.asset].balance + action.payload.change
          ),
        },
      };
    }
    default:
      return assets;
  }
}
