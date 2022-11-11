import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages

import graveyard_dashboard from "./dashboard/widgets";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import NotFoundPage from "./examples/NotFound";
// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import jwt_decode from "jwt-decode";
import Addadmin from "./AddAdmin";
import clients from "./clients";
import AddClient from "./addClient";
import Addsuperadmin from "./addSuperAdmin";
import AddProfile from "./AddProfile";
import Myprofiles from "./myprofiles";
import ProfileCardWidget from "./profile";
import GetClient from "./adminListClient";
import AllProfiles from "./listeProfiles";
import AllSuperAdmins from "./listSuperAdmin";
import EditGrave from "./editGrave";
import EditSuperAdmin from "./editSuperAdmin";
import Test from "./testProfile";
import Testedit from "./testEditProfile";
import Staff from "./staff";
import addStaff from "./addGStaff";
import Staffclient from "./staffListClient";
import StaffProfile from "./staffListeProfiles";
import Me from "./myProfile";
import editClient from "./editClient";
import Addastaff from "./addAstaff";
import Superadminstaff from "./superadminstaff";
import Prices from "./prices";
import Addprice from "./addprice";
import Mytickets from "./adminTickets";
import Ticketdetails from "./tickets/widgets";
import Alltickets from "./allTickets";
import Invi from "./invitations/searchList";
import InviOut from "./invitations/invitationsOut";
import InviIn from "./invitations/invitationsIn";
import Parente from "./invitations/prente";
import StaffTickets from "./staffTickets";
import GraveyardReport from "./dashboard/pergraveyard";
import graveyard_dashboard_cim from "./graveDashboard/widgets";
import comments from "./comments/index";
import welcome from "./password/welcomePassword";
import requests from "./requests";
import Language from "../components/language";
import Map from "./map";
import Emplacement from "./map/empalcement";
const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Language />
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />

          <main className="content">
            <Navbar />
            <Component {...props} />
            <Footer
              toggleSettings={toggleSettings}
              showSettings={showSettings}
            />
          </main>
        </>
      )}
    />
  );
};
//const email = JSON.parse(localStorage.getItem("email"));
const token = JSON.parse(localStorage.getItem("token"));
let decoded = null;
if (token !== null) decoded = jwt_decode(token);

export default function Myroutes() {
  return (
    <>
      {decoded !== null && decoded.role === "superadmin" ? (
        <Switch>
          <Redirect path="/signin" to="/graveyard_dashboard" />
          <RouteWithSidebar exact path="/" component={clients} />
          <RouteWithSidebar
            exact
            path="/addsuperadmin"
            component={Addsuperadmin}
          />
          <RouteWithSidebar
            exact
            path="/addadmingstaff"
            component={Addastaff}
          />
          <RouteWithSidebar exact path="/mystaff" component={Superadminstaff} />

          <RouteWithSidebar
            exact
            path="/singlereport/:id"
            component={GraveyardReport}
          />
          <RouteWithSidebar exact path="/requests" component={requests} />

          <RouteWithSidebar exact path="/me/:id" component={Me} />
          <RouteWithSidebar exact path="/profiles" component={AllProfiles} />
          <RouteWithSidebar exact path="/prof/:id" component={Test} />
          <RouteWithSidebar exact path="/prices" component={Prices} />
          <RouteWithSidebar exact path="/addprices" component={Addprice} />
          <RouteWithSidebar exact path="/alltickets" component={Alltickets} />
          <RouteWithSidebar
            exact
            path="/ticketdetail/:id"
            component={Ticketdetails}
          />

          <RouteWithSidebar exact path="/editgrave/:id" component={EditGrave} />
          <RouteWithSidebar
            exact
            path="/admin/superadmins"
            component={AllSuperAdmins}
          />
          <RouteWithSidebar
            exact
            path="/editsuperadmin/:id"
            component={EditSuperAdmin}
          />

          {/* pages */}
          <RouteWithSidebar
            exact
            path={Routes.Gaveyarddashboard.path}
            component={graveyard_dashboard}
          />
          <RouteWithSidebar exact path="/AdminClients" component={clients} />
          <RouteWithSidebar
            exact
            path="/GraveyardsProfiles/:id"
            component={GetClient}
          />

          <RouteWithSidebar exact path="/AdminAdd" component={Addadmin} />

          <RouteWithSidebar exact path="/editprof/:id" component={Testedit} />
          <RouteWithLoader
            exact
            path={Routes.NotFound.path}
            component={NotFoundPage}
          />
          <Redirect to={Routes.NotFound.path} />
        </Switch>
      ) : decoded !== null && decoded.role === "admin" ? (
        <Switch>
          <Redirect path="/signin" to="/adminclients" />
          <RouteWithSidebar exact path="/" component={GetClient} />
          <RouteWithSidebar exact path="/invi/:id/:fullname" component={Invi} />
          <RouteWithSidebar exact path="/prof/:id" component={Test} />
          <RouteWithSidebar exact path="/staff" component={Staff} />
          <RouteWithSidebar exact path="/addstaff" component={addStaff} />
          <RouteWithSidebar exact path="/editprof/:id" component={Testedit} />
          <RouteWithSidebar exact path="/emplacements" component={Emplacement} />

          <RouteWithSidebar
            exact
            path="/editclient/:id"
            component={editClient}
          />
          <RouteWithSidebar exact path="/mytickets" component={Mytickets} />
          <RouteWithSidebar
            exact
            path="/ticketdetail/:id"
            component={Ticketdetails}
          />
          <RouteWithSidebar
            exact
            path="/dashboard"
            component={graveyard_dashboard_cim}
          />

          <RouteWithSidebar exact path="/me/:id" component={Me} />

          {/* pages */}
          <RouteWithSidebar
            exact
            path="/adminaddclient"
            component={AddClient}
          />

          <RouteWithSidebar exact path="/adminclients" component={GetClient} />

          <RouteWithSidebar
            exact
            path="/adminprofiles"
            component={AllProfiles}
          />

          <RouteWithSidebar exact path="/clients" component={clients} />

          <RouteWithSidebar exact path="/AddAdmin" component={Addadmin} />
          <RouteWithLoader
            exact
            path={Routes.NotFound.path}
            component={NotFoundPage}
          />
          <Redirect to={Routes.NotFound.path} />
        </Switch>
      ) : decoded !== null && decoded.role === "client" ? (
        <Switch>
          <Redirect path="/signin" to="/myProfiles" />
          <RouteWithSidebar exact path="/" component={Myprofiles} />
          <RouteWithSidebar exact path="/me/:id" component={Me} />
          <RouteWithSidebar
            exact
            path="/invi/:id/:nom/:prenom"
            component={Invi}
          />
          <RouteWithSidebar exact path="/invi/:id/:fullname" component={Invi} />
          <RouteWithSidebar
            exact
            path="/invitationsout/:id"
            component={InviOut}
          />
          <RouteWithSidebar
            exact
            path="/invitationsin/:id"
            component={InviIn}
          />
          <RouteWithSidebar exact path="/parente/:id" component={Parente} />
          <RouteWithSidebar exact path="/editprof/:id" component={Testedit} />
          <RouteWithSidebar exact path="/prof/:id" component={Test} />
          <RouteWithSidebar exact path="/editprof/:id" component={Testedit} />
          {/* pages */}
          <RouteWithSidebar exact path="/AddProfile" component={AddProfile} />
          <RouteWithSidebar exact path="/profile/:id" component={AddProfile} />
          <RouteWithSidebar
            exact
            path="/defunt/:id"
            component={ProfileCardWidget}
          />{" "}
          <RouteWithSidebar exact path="/comments" component={comments} />
          <RouteWithSidebar exact path="/myProfiles" component={Myprofiles} />
          <RouteWithSidebar exact path="/AddAdmin" component={Addadmin} />
          {/* components */}
          <RouteWithLoader
            exact
            path={Routes.NotFound.path}
            component={NotFoundPage}
          />
          <Redirect to={Routes.NotFound.path} />
        </Switch>
      ) : decoded !== null && decoded.role === "gstaff" ? (
        <Switch>
          <Redirect path="/signin" to="/Staffclient" />
          <RouteWithSidebar exact path="/" component={Staffclient} />
          <RouteWithSidebar exact path="/prof/:id" component={Test} />
          <RouteWithSidebar exact path="/me/:id" component={Me} />

          {/* pages */}
          <RouteWithSidebar
            exact
            path="/adminaddclient"
            component={AddClient}
          />

          <RouteWithSidebar exact path="/Staffclient" component={Staffclient} />

          <RouteWithSidebar
            exact
            path="/staffprofile"
            component={StaffProfile}
          />
          <RouteWithSidebar exact path="/editprof/:id" component={Testedit} />

          <RouteWithSidebar exact path="/clients" component={clients} />
          <RouteWithLoader
            exact
            path={Routes.NotFound.path}
            component={NotFoundPage}
          />
          <Redirect to={Routes.NotFound.path} />
        </Switch>
      ) : decoded !== null && decoded.role === "gadmin" ? (
        <Switch>
          <Redirect path="/signin" to="/adminclients" />
          <RouteWithSidebar exact path="/" component={GetClient} />
          <RouteWithSidebar exact path="/me/:id" component={Me} />

          <RouteWithSidebar exact path="/prof/:id" component={Test} />
          <RouteWithSidebar exact path="/staff" component={Staff} />
          <RouteWithSidebar exact path="/addstaff" component={addStaff} />
          <RouteWithSidebar exact path="/editprof/:id" component={Testedit} />

          {/* pages */}
          <RouteWithSidebar
            exact
            path="/adminaddclient"
            component={AddClient}
          />

          <RouteWithSidebar exact path="/adminclients" component={GetClient} />

          <RouteWithSidebar
            exact
            path="/adminprofiles"
            component={AllProfiles}
          />

          <RouteWithSidebar
            exact
            path={Routes.Gaveyarddashboard.path}
            component={graveyard_dashboard}
          />
          <RouteWithSidebar exact path="/clients" component={clients} />

          <RouteWithSidebar exact path="/AddAdmin" component={Addadmin} />
          <RouteWithLoader
            exact
            path={Routes.NotFound.path}
            component={NotFoundPage}
          />
          <Redirect to={Routes.NotFound.path} />
        </Switch>
      ) : decoded !== null && decoded.role === "gcompta" ? (
        <Switch>
          <Redirect path="/signin" to="/dashboard" />
          <RouteWithSidebar
            exact
            path="/dashboard"
            component={graveyard_dashboard_cim}
          />

          <RouteWithSidebar exact path="/" component={Staffclient} />
          <RouteWithSidebar exact path="/prof/:id" component={Test} />
          <RouteWithSidebar exact path="/me/:id" component={Me} />

          {/* pages */}
          <RouteWithSidebar
            exact
            path="/adminaddclient"
            component={AddClient}
          />

          <RouteWithSidebar exact path="/Staffclient" component={Staffclient} />

          <RouteWithSidebar
            exact
            path="/staffprofile"
            component={StaffProfile}
          />
          <RouteWithSidebar exact path="/editprof/:id" component={Testedit} />

          <RouteWithSidebar
            exact
            path={Routes.Gaveyarddashboard.path}
            component={graveyard_dashboard}
          />
          <RouteWithSidebar exact path="/clients" component={clients} />
          <RouteWithLoader
            exact
            path={Routes.NotFound.path}
            component={NotFoundPage}
          />
          <Redirect to={Routes.NotFound.path} />
        </Switch>
      ) : decoded !== null && decoded.role === "help" ? (
        <Switch>
          <Redirect path="/signin" to="/alltickets" />
          <RouteWithSidebar exact path="/" component={clients} />
          <RouteWithSidebar
            exact
            path="/addsuperadmin"
            component={Addsuperadmin}
          />

          <RouteWithSidebar exact path="/alltickets" component={StaffTickets} />
          <RouteWithSidebar
            exact
            path="/ticketdetail/:id"
            component={Ticketdetails}
          />
          <RouteWithSidebar
            exact
            path="/addadmingstaff"
            component={Addastaff}
          />
          <RouteWithSidebar exact path="/mystaff" component={Superadminstaff} />

          <RouteWithSidebar exact path="/me/:id" component={Me} />
          <RouteWithSidebar exact path="/profiles" component={AllProfiles} />

          <RouteWithSidebar exact path="/prof/:id" component={Test} />
          <RouteWithSidebar exact path="/prof/:id" component={Test} />

          <RouteWithSidebar exact path="/editgrave/:id" component={EditGrave} />
          <RouteWithSidebar
            exact
            path="/admin/superadmins"
            component={AllSuperAdmins}
          />
          <RouteWithSidebar
            exact
            path="/editsuperadmin/:id"
            component={EditSuperAdmin}
          />

          {/* pages */}
          <RouteWithSidebar
            exact
            path={Routes.Gaveyarddashboard.path}
            component={graveyard_dashboard}
          />
          <RouteWithSidebar exact path="/AdminClients" component={clients} />
          <RouteWithSidebar
            exact
            path="/GraveyardsProfiles/:id"
            component={GetClient}
          />

          <RouteWithSidebar exact path="/AdminAdd" component={Addadmin} />

          <RouteWithSidebar exact path="/editprof/:id" component={Testedit} />
          <RouteWithLoader
            exact
            path={Routes.NotFound.path}
            component={NotFoundPage}
          />
          <Redirect to={Routes.NotFound.path} />
        </Switch>
      ) : decoded !== null && decoded.role === "sales" ? (
        <Switch>
          <Redirect path="/signin" to="/graveyard_dashboard" />
          <RouteWithSidebar exact path="/" component={clients} />

          <RouteWithSidebar exact path="/me/:id" component={Me} />

          <RouteWithSidebar exact path="/prof/:id" component={Test} />
          <RouteWithSidebar exact path="/prof/:id" component={Test} />

          <RouteWithSidebar exact path="/editgrave/:id" component={EditGrave} />

          {/* pages */}
          <RouteWithSidebar
            exact
            path={Routes.Gaveyarddashboard.path}
            component={graveyard_dashboard}
          />
          <RouteWithSidebar exact path="/AdminClients" component={clients} />
          <RouteWithSidebar
            exact
            path="/GraveyardsProfiles/:id"
            component={GetClient}
          />

          <RouteWithSidebar exact path="/AdminAdd" component={Addadmin} />

          <RouteWithSidebar exact path="/editprof/:id" component={Testedit} />
          <RouteWithLoader
            exact
            path={Routes.NotFound.path}
            component={NotFoundPage}
          />
          <Redirect to={Routes.NotFound.path} />
        </Switch>
      ) : decoded !== null && decoded.role === "sadmin" ? (
        <Switch>
          <Redirect path="/signin" to="/graveyard_dashboard" />
          <RouteWithSidebar exact path="/" component={clients} />
          <RouteWithSidebar
            exact
            path="/addsuperadmin"
            component={Addsuperadmin}
          />
          <RouteWithSidebar
            exact
            path="/addadmingstaff"
            component={Addastaff}
          />
          <RouteWithSidebar exact path="/mystaff" component={Superadminstaff} />
          <RouteWithSidebar exact path="/me/:id" component={Me} />
          <RouteWithSidebar exact path="/profiles" component={AllProfiles} />
          <RouteWithSidebar exact path="/prof/:id" component={Test} />
          <RouteWithSidebar exact path="/prof/:id" component={Test} />
          <RouteWithSidebar exact path="/editgrave/:id" component={EditGrave} />

          {/* pages */}
          <RouteWithSidebar
            exact
            path={Routes.Gaveyarddashboard.path}
            component={graveyard_dashboard}
          />
          <RouteWithSidebar exact path="/AdminClients" component={clients} />
          <RouteWithSidebar
            exact
            path="/GraveyardsProfiles/:id"
            component={GetClient}
          />

          <RouteWithSidebar exact path="/AdminAdd" component={Addadmin} />

          <RouteWithSidebar exact path="/editprof/:id" component={Testedit} />
          <RouteWithLoader
            exact
            path={Routes.NotFound.path}
            component={NotFoundPage}
          />
          <Redirect to={Routes.NotFound.path} />
        </Switch>
      ) : (
        <Switch>
          <RouteWithLoader exact path="/signin" component={Signin} />
          <RouteWithLoader
            exact
            path="/forgot-password"
            component={ForgotPassword}
          />

          <RouteWithLoader
            exact
            path="/reset-password/:id"
            component={ResetPassword}
          />
          <RouteWithLoader
            exact
            path="/welcome/:id/:timestamp"
            component={welcome}
          />
          <RouteWithLoader
            exact
            path="/defunt/:id"
            component={ProfileCardWidget}
          />
          <RouteWithLoader exact path="/signup" component={Signup} />
          <RouteWithLoader exact path="/map" component={Map} />

          <RouteWithLoader exact path="/prof/:id" component={Test} />
          <Redirect to="/signin" />
        </Switch>
      )}
    </>
  );
}
