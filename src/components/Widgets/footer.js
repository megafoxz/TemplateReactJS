import React from 'react';
import { useTranslation } from "react-i18next";
import { Layout } from 'antd';

const { Footer: FooterAntd } = Layout;

export default function Footer() {
  const { t:translation } = useTranslation()
  
  return (
    <FooterAntd>
      <div className="footer">
        <span>Makefamousapp.com</span>
        <span>{translation("footer.title")}</span>
      </div>
    </FooterAntd>
  );
}
