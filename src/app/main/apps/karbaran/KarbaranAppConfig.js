import { lazy } from "react";
import KarbarForm from "./karbar/KarbarForm";

const KarbaranApp = lazy(() => import("./KarbaranApp"));

const KarbaranAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "apps/karbaran",
      element: <KarbaranApp />,
      children: [
        // { path: ":id", Element: <karbarView /> },
        { path: ":id/edit", element: <KarbarForm /> },
      ],
    },
  ],
};

export default KarbaranAppConfig;
