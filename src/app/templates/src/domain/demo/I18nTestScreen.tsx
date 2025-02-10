import type { FC } from "react";

import { I18nService, observer, useInjection } from "@cpro-js/react-core";
import { NotificationService } from "@cpro-js/react-ui5-notification";
import { CurrencyInput, DatePicker, NumberInput } from "@cpro-js/react-ui5-webcomponents-form";
import { Bar, Button, DynamicPage, DynamicPageHeader, DynamicPageTitle, Label, Title } from "@ui5/webcomponents-react";
import { useCallback } from "react";

export const I18nTestScreen: FC = observer(() => {
  const { showSuccess, showError } = useInjection(NotificationService);
  const i18nService = useInjection(I18nService);
  const { t, formatDate } = i18nService;

  const pageTitle = "TestScreen";

  const handleLocale = useCallback((locale: string) => {
    i18nService.useLocale(locale).then(() => console.log("Changed Locale!", locale));
  }, []);
  const handleSuccess = useCallback(() => {
    showSuccess("Yippie!");
  }, []);
  const handleError = useCallback(() => {
    showError("Oh no!", "My Detail messsage!");
  }, []);

  return (
    <DynamicPage
      titleArea={<DynamicPageTitle heading={<Title>{pageTitle}</Title>} />}
      headerArea={<DynamicPageHeader>My Header Content, e.g. search form</DynamicPageHeader>}
      footerArea={
        <Bar
          design="FloatingFooter"
          endContent={
            <>
              <Button design="Positive" onClick={handleSuccess}>
                Success Message
              </Button>
              <Button design="Negative" onClick={handleError}>
                Error Message
              </Button>
            </>
          }
        />
      }
    >
      <section>
        <h2>Hello World!</h2>
        <Button onClick={() => handleLocale("de")}>DE</Button>
        <Button onClick={() => handleLocale("en-US")}>EN-US</Button>
        <Button onClick={() => handleLocale("en-GB")}>EN-GB</Button>
        <ul>
          <li>Current Formatting Locale: {i18nService.getFormattingLocale()}</li>
          <li>Current Translation Language: {i18nService.getTranslationLocale()}</li>
          <li>Current Timezone: {i18nService.getTimezone()}</li>
        </ul>
        <Label showColon>DatePicker {formatDate(new Date("1999-12-31"))}</Label>
        <br />
        <DatePicker value={"1999-12-31"} formatPattern="short" />
        <DatePicker value={"2000-01-01"} formatPattern="short" />
        <br />
        <br />
        <Label showColon>NumberInput</Label>
        <br />
        <NumberInput value={123456.789123} />
        <br />
        <br />
        <Label showColon>CurrencyInput</Label>
        <br />
        <CurrencyInput value={123456.789123} currency={"EUR"} />
        <br />
        <br />

        <h2>Cascading Translation</h2>
        <p>{t("test.cascadingLocalization")}</p>

        <h2>Interpolation</h2>
        <p>{t("test.interpolation", { testName: "The Test", testSize: 15 })}</p>

        <h2>Pluralization</h2>
        <ul>
          <li>{t("test.pluralization", { count: 0 })}</li>
          <li>{t("test.pluralization", { count: 1 })}</li>
          <li>{t("test.pluralization", { count: 6 })}</li>
        </ul>
      </section>
    </DynamicPage>
  );
});
