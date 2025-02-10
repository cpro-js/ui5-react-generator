import { observer } from "@cpro-js/react-core";
import { Button, Title } from "@ui5/webcomponents-react";
import { type FC, useCallback } from "react";
import { useHistory } from "react-router";
import { MainLayout } from "../../component/MainLayout";
// CSS integration example
import styleClasses from "./TestScreen.module.scss";

export const TestScreen: FC = observer(() => {
  // hook for routing => react-router
  const history = useHistory();

  // event handler
  const goToI18n = useCallback(() => {
    // navigation to different page => see AppRouter
    history.push("i18n");
  }, []);

  return (
    <MainLayout
      pageTitle={"My Test Page"}
      headerContent={<p>My Header Content</p>}
      footerEndContent={
        <>
          <Button design="Transparent" onClick={goToI18n}>
            Go to I18n Test Screen!
          </Button>
        </>
      }
    >
      <Title>My very first Test Page!</Title>

      <div className={styleClasses.myTitle}>Testing Styling</div>
    </MainLayout>
  );
});
