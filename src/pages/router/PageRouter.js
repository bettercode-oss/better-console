import React from "react";
import {Switch} from "react-router-dom";
import PageLoadingRoute from "../../components/router/PageLoadingRoute";
import IgnoreList from "../web-hook-go/IgnoreList";
import IgnoreForm from "../web-hook-go/IgnoreForm";
import TemplateForm from "../web-hook-go/TemplateForm";

const PageRouter = () => (
  <>
    <Switch>
      <PageLoadingRoute path="/web-hook-go/ignores/new" component={IgnoreForm} />
      <PageLoadingRoute path="/web-hook-go/ignores" component={IgnoreList} />
      <PageLoadingRoute path="/web-hook-go/template" component={TemplateForm} />
    </Switch>
  </>
);

export default PageRouter;
