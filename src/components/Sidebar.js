import React, { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faChartPie,
  faSignOutAlt,
  faTimes,
  faMapPin,
  faAddressBook,
  faImages,
  faHouseUser,
  faMap,
  faUser,
  faChurch,
  faUsers,
  faSuitcase,
  faHome,
  faDollarSign,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Badge,
  Image,
  Button,
  Dropdown,
  Accordion,
  Navbar,
  Col,
  Row,
  Card,
} from "@themesberg/react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Routes } from "../routes";
import Full_logo_white from "../assets/img/Full_logo_white.svg";
import logo_white from "../assets/img/logo_white.png";
import moment from "moment-timezone";

import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";
import axios from "axios";
import { useTranslation } from "react-i18next";
//eslint-disable-next-line
export default (props = {}) => {
  const currentYear = moment().get("year");
  const { t } = useTranslation();
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);
  const history = useHistory();
  function logout() {
    localStorage.clear();
    history.go(0);
  }

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button
            as={Nav.Link}
            className="d-flex justify-content-between align-items-center"
          >
            <span>
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">{children}</Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const {
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = "secondary",
      badgeColor = "primary",
    } = props;
    const classNames = badgeText
      ? "d-flex justify-content-start align-items-center justify-content-between"
      : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
            ) : null}
            {image ? (
              <Image
                src={image}
                width={20}
                height={20}
                className="sidebar-icon svg-icon"
              />
            ) : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className="badge-md notification-count ms-2"
            >
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };
  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);
  const [count, setCount] = useState(0);
  const [comments, setComments] = useState(0);

  const [barStyling, setStyling] = useState("bg-primary");

  async function getCount() {
    if (decoded.role === "client") {
      const response = await axios.post(
        "http://www.skiesbook.com:3000/api/v1/profile/notifsin",
        {
          id: decoded.userId,
        }
      );
      setCount(response?.data?.inv);
      setComments(response?.data?.comments);
      localStorage.setItem("invs", JSON.stringify(response?.data?.inv));
      localStorage.setItem("com", JSON.stringify(response?.data?.comments));
    }
  }
  useEffect(() => {
    getCount();
    sideBar();
  }, []);

  async function sideBar() {
    if (
      decoded.role === "superadmin" ||
      decoded.role === "sales" ||
      decoded.role === "help"
    ) {
      setStyling("bg-black");
    } else if (
      decoded.role === "admin" ||
      decoded.role === "gstaff" ||
      decoded.role === "gadmin" ||
      decoded.role === "gcompta"
    ) {
      setStyling("bg-admin");
    } else setStyling("bg-primary");
  }

  return (
    <>
      <Navbar
        expand={false}
        collapseOnSelect
        variant="dark"
        className="navbar-theme-primary px-4 d-md-none"
      >
        <Navbar.Brand
          className="me-lg-5"
          as={Link}
          to={Routes.DashboardOverview.path}
        >
          <Image src={logo_white} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle
          as={Button}
          aria-controls="main-navbar"
          onClick={onCollapse}
        >
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar
          style={{ backgroundColor: "black" }}
          className={`collapse ${showClass} sidebar d-md-block ${barStyling} text-white`}
        >
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image
                    src={"http://www.skiesbook.com:3000/uploads/" + decoded.image}
                    className="card-img-top rounded-circle border-white"
                  />
                </div>
                <div className="d-block">
                  <h6>Hello {decoded?.name}</h6>
                  <Button
                    as={Link}
                    variant="secondary"
                    size="xs"
                    to={Routes.Signin.path}
                    className="text-dark"
                    onClick={() => logout()}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Log
                    Out
                  </Button>
                </div>
              </div>
              <Nav.Link
                className="collapse-close d-md-none"
                onClick={onCollapse}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            {decoded.role === "client" ? (
              <Nav className="flex-column pt-3 pt-md-0">
                <div className="d-flex flex-row align-items-center pb-3">
                  <img alt="logo" src={logo_white} width="20%" />

                  <h6 style={{ paddingTop: "15px", paddingLeft: "15px" }}>
                    {t('Welcome')} <br></br> {decoded?.name}
                  </h6>
                </div>
                <NavItem
                  title="Gestion des profils"
                  link="/myProfiles"
                  icon={faUser}
                />

                <NavItem
                  title={t('relationship')}
                  icon={faHouseUser}
                  badgeText={count?.toString()}
                  link={"/parente/" + decoded?.userId}
                  eventKey="parente"

                //  link={Routes.Settings.path}
                />

                <NavItem
                  title={t('Comments')}
                  icon={faHouseUser}
                  badgeText={comments?.toString()}
                  link={"/comments"}
                  eventKey="comments"

                //  link={Routes.Settings.path}
                />

                {/*  <NavItem
                  external
                  title="Partage"
                  link="https://demo.themesberg.com/volt-pro-react/#/map"
                  target="_blank"
                  icon={faMapPin}
                />

                <CollapsableNavItem
                  eventKey="tables/"
                  title="Tables"
                  icon={faTable}
                >
                  <NavItem
                    title="Bootstrap Table"
                    link={Routes.BootstrapTables.path}
                  />
                </CollapsableNavItem>

                <CollapsableNavItem
                  eventKey="examples/"
                  title="Page Examples"
                  icon={faFileAlt}
                >
                  <NavItem title="Sign In" link={Routes.Signin.path} />
                  <NavItem title="Sign Up" link={Routes.Signup.path} />
                  <NavItem
                    title="Forgot password"
                    link={Routes.ForgotPassword.path}
                  />
                  <NavItem
                    title="Reset password"
                    link={Routes.ResetPassword.path}
                  />
                  <NavItem title="Lock" link={Routes.Lock.path} />
                  <NavItem title="404 Not Found" link={Routes.NotFound.path} />
                  <NavItem
                    title="500 Server Error"
                    link={Routes.ServerError.path}
                  />
                </CollapsableNavItem>

                <NavItem
                  external
                  title="Plugins"
                  link="https://demo.themesberg.com/volt-pro-react/#/plugins/datatable"
                  target="_blank"
                  icon={faChartPie}
                />

                <Dropdown.Divider className="my-3 border-indigo" />

                <CollapsableNavItem
                  eventKey="documentation/"
                  title="Getting Started"
                  icon={faBook}
                >
                  <NavItem title="Overview" link={Routes.DocsOverview.path} />
                  <NavItem title="Download" link={Routes.DocsDownload.path} />
                  <NavItem
                    title="Quick Start"
                    link={Routes.DocsQuickStart.path}
                  />
                  <NavItem title="License" link={Routes.DocsLicense.path} />
                  <NavItem
                    title="Folder Structure"
                    link={Routes.DocsFolderStructure.path}
                  />
                  <NavItem title="Build Tools" link={Routes.DocsBuild.path} />
                  <NavItem title="Changelog" link={Routes.DocsChangelog.path} />
                </CollapsableNavItem>
                <CollapsableNavItem
                  eventKey="components/"
                  title="Components"
                  icon={faBoxOpen}
                >
                  <NavItem title="Accordion" link={Routes.Accordions.path} />
                  <NavItem title="Alerts" link={Routes.Alerts.path} />
                  <NavItem title="Badges" link={Routes.Badges.path} />
                  <NavItem
                    external
                    title="Widgets"
                    link="https://demo.themesberg.com/volt-pro-react/#/components/widgets"
                    target="_blank"
                  />
                  <NavItem title="Breadcrumbs" link={Routes.Breadcrumbs.path} />
                  <NavItem title="Buttons" link={Routes.Buttons.path} />
                  <NavItem title="Forms" link={Routes.Forms.path} />
                  <NavItem title="Modals" link={Routes.Modals.path} />
                  <NavItem title="Navbars" link={Routes.Navbars.path} />
                  <NavItem title="Navs" link={Routes.Navs.path} />
                  <NavItem title="Pagination" link={Routes.Pagination.path} />
                  <NavItem title="Popovers" link={Routes.Popovers.path} />
                  <NavItem title="Progress" link={Routes.Progress.path} />
                  <NavItem title="Tables" link={Routes.Tables.path} />
                  <NavItem title="Tabs" link={Routes.Tabs.path} />
                  <NavItem title="Toasts" link={Routes.Toasts.path} />
                  <NavItem title="Tooltips" link={Routes.Tooltips.path} />
                </CollapsableNavItem> */}
              </Nav>
            ) : decoded.role === "superadmin" ? (
              <>
                <Nav className="flex-column pt-3 pt-md-0">
                  <div className="d-flex flex-row align-items-center pb-3">
                    <img alt="logo" src={logo_white} width="20%" />

                    <h6 style={{ paddingTop: "15px", paddingLeft: "15px" }}>
                      {t('Welcome')} <br></br> {decoded?.name}
                    </h6>
                  </div>

                  <NavItem
                    external
                    title={t('super_admins')}
                    link="/admin/superadmins"
                    icon={faUser}
                    eventKey="/admin/superadmins"
                  />

                  <NavItem
                    title={t('My account')}
                    link={"/me/" + decoded.userId}
                    icon={faUser}
                  />
                  <NavItem
                    external
                    title={t("list_of_profiles")}
                    link="/profiles"
                    icon={faChurch}
                    eventKey="/profiles"
                  />
                  <NavItem
                    external
                    title={t("list_of_cemeteries")}
                    link="/AdminClients"
                    icon={faUsers}
                    eventKey="/Admin"
                  />
                  <NavItem
                    title={t("Employees")}
                    icon={faSuitcase}
                    link="/mystaff"
                    eventKey="/mystaff"
                  />

                  <NavItem
                    title={t("Manage prices")}
                    icon={faDollarSign}
                    link="/prices"
                    disabled
                  />

                  <NavItem
                    external
                    title={t("Tickets")}
                    link="/alltickets"
                    icon={faTicketAlt}
                    eventKey="/alltickets"
                  />
                  <NavItem
                    external
                    title={t("Partnership requests")}
                    link="/requests"
                    icon={faTicketAlt}
                  />
                  <NavItem
                    external
                    title={t("Reports")}
                    link="/graveyard_dashboard"
                    icon={faChartPie}
                  />
                </Nav>
              </>
            ) : decoded.role === "admin" ? (
              <>
                <Nav className="flex-column pt-3 pt-md-0">
                  <div className="d-flex flex-row align-items-center pb-3">
                    <img alt="logo" src={logo_white} width="20%" />
                    <div style={{ maxWidth: "100px" }}>
                      <h6
                        style={{
                          paddingTop: "15px",
                          paddingLeft: "15px",
                          maxWidth: "100px",
                        }}
                      >
                        {t('Welcome')} <br></br> {decoded?.name}
                      </h6>
                    </div>
                  </div>

                  <NavItem
                    title={t("My account")}
                    link={"/me/" + decoded.userId}
                    eventKey="/me"
                    icon={faUser}
                  />
                  <NavItem
                    external
                    title={t("Client List")}
                    link="/adminclients"
                    icon={faUsers}
                    eventKey="/admin"
                  />

                  <NavItem
                    external
                    title={t("All profiles")}
                    link="/adminprofiles"
                    icon={faUsers}
                    eventKey="/adminprofiles"
                  />
                  <NavItem
                    title={t("locations")}
                    link="/Emplacements"
                    icon={faMap}
                    eventKey="/Emplacements"
                  />
                  {/* <CollapsableNavItem
                eventKey="/admin"
                title="Compte clients"
                icon={faUsers}
              >
                <NavItem title="Ajouter des clients" link="/adminaddclient" />
                <NavItem title="Liste des clients" link="/adminclients" />
                <NavItem title="Liste des profiles" link="/adminprofiles" />
              </CollapsableNavItem> */}
                  <NavItem
                    title={t("Employees")}
                    icon={faSuitcase}
                    link="/staff"
                    eventKey="/staff"

                  // link={Routes.Transactions.path}
                  />
                  <NavItem
                    external
                    title={t("Support")}
                    link="/mytickets"
                    icon={faTicketAlt}
                    eventKey="/mytickets"
                  />
                  <NavItem
                    title={t("Reports")}
                    link={"/dashboard"}
                    eventKey="/dashboard"
                    icon={faChartPie}
                  />
                </Nav>
              </>
            ) : decoded.role === "gstaff" ? (
              <>
                <Nav className="flex-column pt-3 pt-md-0">
                  <div className="d-flex flex-row align-items-center pb-3">
                    <img alt="logo" src={logo_white} width="20%" />

                    <h6 style={{ paddingTop: "15px", paddingLeft: "15px" }}>
                      {t('Welcome')} <br></br> {decoded?.name}
                    </h6>
                  </div>
                  <NavItem
                    title={t("My account")}
                    link={"/me/" + decoded.userId}
                    eventKey="/me"
                    icon={faUser}
                  />

                  <NavItem
                    external
                    title={t("Client List")}
                    link="/Staffclient"
                    // link="https://demo.themesberg.com/volt-pro-react/#/messages"
                    //target="_blank"
                    icon={faUsers}
                    eventKey="/admin"
                  />

                  <NavItem
                    external
                    title={t("All profiles")}
                    link="/staffprofile"
                    // link="https://demo.themesberg.com/volt-pro-react/#/messages"
                    //target="_blank"
                    icon={faUsers}
                    eventKey="/staffprofile"
                  />
                </Nav>
              </>
            ) : decoded.role === "gadmin" ? (
              <>
                <Nav className="flex-column pt-3 pt-md-0">
                  <div className="d-flex flex-row align-items-center pb-3">
                    <img alt="logo" src={logo_white} width="20%" />

                    <h6 style={{ paddingTop: "15px", paddingLeft: "15px" }}>
                      {t('Welcome')} <br></br> {decoded?.name}
                    </h6>
                  </div>
                  <NavItem
                    title={t("My account")}
                    link={"/me/" + decoded.userId}
                    eventKey="/me"
                    icon={faUser}
                  />

                  <NavItem
                    external
                    title={t("Client List")}
                    link="/adminclients"
                    // link="https://demo.themesberg.com/volt-pro-react/#/messages"
                    //target="_blank"
                    icon={faUsers}
                    eventKey="/admin"
                  />

                  <NavItem
                    external
                    title={t("All profiles")}
                    link="/adminprofiles"
                    // link="https://demo.themesberg.com/volt-pro-react/#/messages"
                    //target="_blank"
                    icon={faUsers}
                    eventKey="/adminprofiles"
                  />
                  <NavItem
                    title={t("Employees")}
                    icon={faSuitcase}
                    link="/staff"
                    eventKey="/staff"

                  // link={Routes.Transactions.path}
                  />
                </Nav>
              </>
            ) : decoded.role === "gcompta" ? (
              <>
                <Nav className="flex-column pt-3 pt-md-0">
                  <div className="d-flex flex-row align-items-center pb-3">
                    <img alt="logo" src={logo_white} width="20%" />

                    <h6 style={{ paddingTop: "15px", paddingLeft: "15px" }}>
                      {t('Welcome')} <br></br> {decoded?.name}
                    </h6>
                  </div>
                  <NavItem
                    title={t("Reports")}
                    link={"/dashboard"}
                    eventKey="/dashboard"
                    icon={faChartPie}
                  />
                  <NavItem
                    title={t("My account")}
                    link={"/me/" + decoded.userId}
                    eventKey="/me"
                    icon={faUser}
                  />

                  <NavItem
                    external
                    title={t("Client List")}
                    link="/Staffclient"
                    // link="https://demo.themesberg.com/volt-pro-react/#/messages"
                    //target="_blank"
                    icon={faUsers}
                    eventKey="/Staffclient"
                  />

                  <NavItem
                    external
                    title={t("All profiles")}
                    link="/staffprofile"
                    // link="https://demo.themesberg.com/volt-pro-react/#/messages"
                    //target="_blank"
                    icon={faUsers}
                    eventKey="/staffprofile"
                  />
                </Nav>
              </>
            ) : decoded.role === "sales" ? (
              <>
                <Nav className="flex-column pt-3 pt-md-0">
                  <div className="d-flex flex-row align-items-center pb-3">
                    <img alt="logo" src={logo_white} width="20%" />

                    <h6 style={{ paddingTop: "15px", paddingLeft: "15px" }}>
                      {t("Welcome")} <br></br> {decoded?.name}
                    </h6>
                  </div>

                  <NavItem
                    external
                    title={t("Reports")}
                    link="/graveyard_dashboard"
                    icon={faHome}
                  />
                  <NavItem
                    title={t("My account")}
                    link={"/me/" + decoded.userId}
                    icon={faUser}
                  />
                  <NavItem
                    external
                    title={t("list_of_profiles")}
                    link="/profiles"
                    icon={faChurch}
                    eventKey="/profiles"
                  />
                  <NavItem
                    external
                    title={t("list_of_cemeteries")}
                    link="/AdminClients"
                    icon={faUsers}
                    eventKey="/Admin"
                  />
                </Nav>
              </>
            ) : decoded.role === "help" ? (
              <>
                <Nav className="flex-column pt-3 pt-md-0">
                  <div className="d-flex flex-row align-items-center pb-3">
                    <img alt="logo" src={logo_white} width="20%" />

                    <h6 style={{ paddingTop: "15px", paddingLeft: "15px" }}>
                      {toString('Welcome')} <br></br> {decoded?.name}
                    </h6>
                  </div>

                  <NavItem
                    title={t("My account")}
                    link={"/me/" + decoded.userId}
                    icon={faUser}
                  />
                  <NavItem
                    external
                    title={t("list_of_profiles")}
                    link="/profiles"
                    icon={faChurch}
                    eventKey="/profiles"
                  />
                  <NavItem
                    external
                    title={t("list_of_cemeteries")}
                    link="/AdminClients"
                    icon={faUsers}
                    eventKey="/Admin"
                  />

                  <NavItem
                    external
                    title={t("Tickets")}
                    link="/alltickets"
                    icon={faTicketAlt}
                    eventKey="/alltickets"
                  />
                </Nav>
              </>
            ) : decoded.role === "sadmin" ? (
              <>
                <Nav className="flex-column pt-3 pt-md-0">
                  <div className="d-flex flex-row align-items-center pb-3">
                    <img alt="logo" src={logo_white} width="20%" />

                    <h6 style={{ paddingTop: "15px", paddingLeft: "15px" }}>
                      {t("Welcome")} <br></br> {decoded?.name}
                    </h6>
                  </div>

                  <NavItem
                    external
                    title={t("Reports")}
                    link="/graveyard_dashboard"
                    icon={faHome}
                  />
                  <NavItem
                    external
                    title={t("Super Admins")}
                    link="/admin/superadmins"
                    icon={faUser}
                    eventKey="/admin/superadmins"
                  />

                  <NavItem
                    title={t("My account")}
                    link={"/me/" + decoded.userId}
                    icon={faUser}
                  />
                  <NavItem
                    external
                    title={t("list_of_profiles")}
                    link="/profiles"
                    icon={faChurch}
                    eventKey="/profiles"
                  />
                  <NavItem
                    external
                    title={t("list_of_cemeteries")}
                    link="/AdminClients"
                    icon={faUsers}
                    eventKey="/Admin"
                  />
                  <NavItem
                    title={t("Employees")}
                    icon={faSuitcase}
                    link="/mystaff"
                    eventKey="/mystaff"

                  // link={Routes.Transactions.path}
                  />
                </Nav>
              </>
            ) : (
              <h1>{t("Not Found Page")}</h1>
            )}
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
