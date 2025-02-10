import "@ui5/webcomponents-fiori/dist/illustrations/SimpleConnection.js";

import type { FC } from "react";

import { useI18n } from "@cpro-js/react-core";
import { Dialog, IllustratedMessage } from "@ui5/webcomponents-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const Connection: FC = () => {
  const [online, setOnline] = useState(true);
  const { t } = useI18n();

  useEffect(() => {
    const isOnline = () => {
      setOnline(true);
    };
    const isOffline = () => {
      setOnline(false);
    };

    window.addEventListener("online", isOnline);
    window.addEventListener("offline", isOffline);

    return () => {
      window.removeEventListener("online", isOnline);
      window.removeEventListener("offline", isOffline);
    };
  }, [setOnline]);

  if (online) {
    return null;
  }

  return createPortal(
    <Dialog
      open={true}
      headerText={t("general.noConnection.caption")}
      footer={null}
      onBeforeClose={(event) => {
        event.preventDefault();
      }}
    >
      <IllustratedMessage
        name="SimpleConnection"
        design="Auto"
        titleText={t("general.noConnection.title")}
        subtitleText={t("general.noConnection.text")}
      />
    </Dialog>,
    document.body
  );
};
