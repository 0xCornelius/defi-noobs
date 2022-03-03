import copyToClipboard from "copy-to-clipboard";
import { shortenAddress } from "../../metamask/helpers/utils/util";
import CopyIcon from "../../metamask/components/ui/icon/copy-icon.component";

export function CopyAddress({ address, withShortAddress, asText, customClass }) {
  const copyElement = (
    <div className="address">
      {withShortAddress ? shortenAddress(address) : address}
      <div className="address__copy-icon">
        <CopyIcon size={11} color="#989a9b" />
      </div>
    </div>
  );

  const buttonCopyAddress = (child) => (
    <button
      className="selected-account__clickable"
      onClick={() => {
        copyToClipboard(address);
      }}
    >
      {child}
    </button>
  );

  const textCopyAddress = (child) => (
    <span
      onClick={() => {
        copyToClipboard(address);
      }}
    >
      {child}
    </span>
  );

  return (
    <div className={`copy-address ${customClass}`}>
      {asText ? textCopyAddress(copyElement) : buttonCopyAddress(copyElement)}
    </div>
  );
}
