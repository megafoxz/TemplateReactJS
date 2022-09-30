import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomeView = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("home.header")}</h1>

      <h2>{t("home.get_started")}</h2>
      <ol>
        <li>
          {t("home.review_the")}
          <Link to="/demo-app">{t("home.demo_app")}</Link>
        </li>
        <li>
          {t("home.get_code_at")}
          <a href="https://github.com/nexlesoft/reactjs-template">
            {t("home.reactjs_template")}
          </a>
        </li>
      </ol>
    </div>
  );
};

export default HomeView;
