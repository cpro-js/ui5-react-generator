import { observer } from "@cpro-js/react-core";
import { Bar, BarDesign, DynamicPage, DynamicPageHeader, DynamicPageTitle } from "@ui5/webcomponents-react";
import { FC, ReactElement, ReactNode } from "react";

export interface MainLayoutProps {
  /**
   * Title of the page.
   * Note: Used within Variant Management component.
   */
  pageTitle: string;

  /**
   * Subtitle of the page.
   */
  pageSubTitle?: ReactNode;

  /**
   * The search form which will be rendered in the header.
   */
  headerContent?: ReactNode;

  /**
   * Always show the header.
   */
  showHeaderAlways?: boolean;
  /**
   * Show the pin to fix the header between header and content body.
   */
  showHeaderPinButton?: boolean;
  /**
   * Show hide button between header and content body.
   */
  showHeaderHideButton?: boolean;

  /**
   * Content to be placed at the beginning of the footer.
   */
  footerStartContent?: ReactElement;
  /**
   * Pass a fragment with a list of Buttons, which will be rendered within the floating footer.
   * Example:
   * <code>
   * <>
   *  <Button design={ButtonDesign.Transparent} onClick={...}>Test</Button>
   * </>
   * </code>
   */
  footerEndContent?: ReactElement;

  /**
   * The body of the page. Render whatever you want.
   */
  children: ReactNode;

  pageTitleActions?: ReactElement;
}

export const MainLayout: FC<MainLayoutProps> = observer((props) => {
  const {
    pageTitle,
    pageSubTitle,
    headerContent,
    showHeaderAlways,
    showHeaderHideButton,
    showHeaderPinButton,
    footerStartContent,
    footerEndContent,
    children,
    pageTitleActions,
  } = props;

  return (
    <DynamicPage
      headerTitle={
        <DynamicPageTitle
          header={pageTitle}
          subHeader={pageSubTitle}
          actions={pageTitleActions && <>{pageTitleActions}</>}
        />
      }
      headerContent={headerContent ? <DynamicPageHeader>{headerContent}</DynamicPageHeader> : undefined}
      alwaysShowContentHeader={!!showHeaderAlways}
      footer={
        footerStartContent || footerEndContent ? (
          <Bar design={BarDesign.FloatingFooter} startContent={footerStartContent} endContent={footerEndContent} />
        ) : undefined
      }
      headerContentPinnable={!!showHeaderPinButton}
      showHideHeaderButton={!!showHeaderHideButton}
    >
      {children}
    </DynamicPage>
  );
});
