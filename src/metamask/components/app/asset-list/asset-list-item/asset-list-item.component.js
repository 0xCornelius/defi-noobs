import Identicon from "../../../ui/identicon/identicon.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function AssetListItem({name, logo, balance}) {
  return (
    <div className="asset-list-item" key={name}>
      <div className="asset-list-item__icon">
        <Identicon diameter={32} image={logo} imageBorder />
      </div>
      <span className="asset-list-item__info">
        {balance} {name}
      </span>
      <div className="asset-list-item__right">
        <FontAwesomeIcon
          className={"asset-list-item__chevron-right"}
          icon={faChevronRight}
        />
      </div>
    </div>
  );
}

export default AssetListItem;
