import MenuBar from "../../components/app/menu-bar";
import Identicon from "../../components/ui/identicon/identicon.component";
import primaryTokenImage from "../../../images/tokens/eth_logo.svg";
import IconButton from "../../components/ui/icon-button";
import { useSelector } from "react-redux";
import SendIcon from "../../components/ui/icon/overview-send-icon.component";
import { Tabs, Tab } from "../../components/ui/tabs";
import AssetList from "../../components/app/asset-list/asset-list.component.js";
import HomeFooter from "../../components/app/home-footer/home-footer";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/app/app-header/app-header";

function Home() {
  const account = useSelector((state) => state.account);
  let navigate = useNavigate();

  return (
    <div className="main-container">
      <AppHeader/>
      <div className="home__container">
        <div className="home__main-view">
          <MenuBar />
          <div className="home__eth-overview">
            <Identicon diameter={32} image={primaryTokenImage} imageBorder />
            <div className="home__eth-balance">{account.eth.balance} ETH</div>
            <IconButton
              className="eth-overview__button"
              data-testid="eth-overview-send"
              Icon={SendIcon}
              label={"send"}
              onClick={() => {
                navigate("/send");
              }}
            />
            <div className="home__tabs">
              <Tabs defaultActiveTabName={"assets"} tabsClassName="home__tabs">
                <Tab
                  activeClassName="home__tab--active"
                  className="home__tab"
                  data-testid="home__asset-tab"
                  name={"assets"}
                >
                  <AssetList
                    onClickAsset={(asset) => {}}
                    assets={account.assets}
                    eth={account.eth}
                  />
                </Tab>
                <Tab
                  activeClassName="home__tab"
                  className="home__tab"
                  data-testid="home__asset-tab"
                  name={"activity"}
                ></Tab>
              </Tabs>
            </div>
            <HomeFooter></HomeFooter>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
