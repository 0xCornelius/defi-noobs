import { useDispatch } from "react-redux";
import AssetListItem from "./asset-list-item/asset-list-item.component";

function AssetList(props) {

  const dispatch = useDispatch();

  return (
    <div>
      <AssetListItem {...props.eth} />
      {Object.values(props.assets).map((asset) => (
        <AssetListItem key={asset.name} {...asset} />
      ))}
      <button
        onClick={() =>
          dispatch({
            type: "metamask/updateAssetBalance",
            payload: { asset: "DAI", change: -2 },
          })
        }
      >
        -2 dai
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "metamask/updateAssetBalance",
            payload: { asset: "DAI", change: +2 },
          })
        }
      >
        +2 dai
      </button>
    </div>
  );
}

export default AssetList;
