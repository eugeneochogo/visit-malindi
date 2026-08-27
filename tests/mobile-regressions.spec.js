import { expect, test } from "@playwright/test";

const mobileRoutes = [
  { name: "home", path: "/" },
  { name: "listing", path: "/things-to-do" },
  { name: "destination", path: "/malindi" },
  { name: "detail", path: "/experience/dolphin-experiences" },
];

async function openRoute(page, path) {
  await page.goto(path, { waitUntil: "domcontentloaded" });
  await page.locator("main").waitFor();
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await expect(page.locator("main")).toBeVisible();
}

async function assertNoHorizontalOverflow(page) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content, "mobile content must not overflow the viewport").toBeLessThanOrEqual(dimensions.viewport + 1);
}

test.describe("mobile route snapshots", () => {
  for (const route of mobileRoutes) {
    test(`${route.name} route keeps its mobile composition`, async ({ page }) => {
      await openRoute(page, route.path);
      await assertNoHorizontalOverflow(page);
      await expect(page).toHaveScreenshot(`${route.name}.png`, {
        mask: [page.locator("img")],
      });
    });
  }
});

test.describe("touch-safe shared UI", () => {
  test("touch layouts do not depend on hover to expose card actions", async ({ page }) => {
    await openRoute(page, "/things-to-do");

    const interactionState = await page.evaluate(() => {
      const card = document.querySelector(".listing-card");
      const cardArrow = card?.querySelector(".card-arrow");
      const enquiryButton = card?.querySelector(".listing-card-actions .button");
      const menuButton = document.querySelector(".menu-trigger");
      const floatingWhatsApp = document.querySelector(".floating-whatsapp");
      const rect = (element) => element && element.getBoundingClientRect().toJSON();
      return {
        hasTouch: window.matchMedia("(hover: none)").matches,
        cardTransform: card && getComputedStyle(card).transform,
        cardArrowOpacity: cardArrow && getComputedStyle(cardArrow).opacity,
        enquiryButton: rect(enquiryButton),
        menuButton: rect(menuButton),
        floatingWhatsApp: rect(floatingWhatsApp),
        viewport: { width: window.innerWidth, height: window.innerHeight },
      };
    });

    expect(interactionState.hasTouch).toBe(true);
    expect(interactionState.cardTransform).toBe("none");
    expect(interactionState.cardArrowOpacity).toBe("1");
    expect(interactionState.enquiryButton.height).toBeGreaterThanOrEqual(44);
    expect(interactionState.menuButton.width).toBeGreaterThanOrEqual(44);
    expect(interactionState.menuButton.height).toBeGreaterThanOrEqual(44);
    expect(interactionState.floatingWhatsApp.width).toBeGreaterThanOrEqual(44);
    expect(interactionState.floatingWhatsApp.height).toBeGreaterThanOrEqual(44);
    expect(interactionState.floatingWhatsApp.right).toBeLessThanOrEqual(interactionState.viewport.width + 1);
    expect(interactionState.floatingWhatsApp.bottom).toBeLessThanOrEqual(interactionState.viewport.height + 1);
  });

  test("mobile destination section navigation stays horizontal and sticky", async ({ page }) => {
    await openRoute(page, "/malindi");

    const navState = await page.locator(".destination-nav").evaluate((nav) => {
      const style = getComputedStyle(nav);
      return {
        overflowX: style.overflowX,
        scrollWidth: nav.scrollWidth,
        clientWidth: nav.clientWidth,
        links: [...nav.querySelectorAll("a")].map((link) => link.getBoundingClientRect().toJSON()),
      };
    });

    expect(navState.overflowX).toBe("auto");
    expect(navState.scrollWidth).toBeGreaterThan(navState.clientWidth);
    expect(navState.links.every((link) => link.height >= 44)).toBe(true);
    await expect(page.locator(".site-header")).toHaveCSS("position", "sticky");
  });

  test("mobile menu opens as a usable full-screen navigation", async ({ page }) => {
    await openRoute(page, "/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.locator(".main-nav.is-open");
    await expect(menu).toBeVisible();
    await expect(menu).toHaveCSS("position", "fixed");
    await expect(menu).toHaveCSS("inset", "0px");
    await expect(menu.getByRole("button", { name: "Close menu" })).toBeVisible();
  });
});

test.describe("reduced-motion presentation", () => {
  test.use({ reducedMotion: "reduce" });

  test("reveal targets are immediately visible without transitions", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await openRoute(page, "/experience/dolphin-experiences");
    const firstReveal = page.locator(".reveal").first();
    await expect(firstReveal).toHaveCSS("opacity", "1");
    const revealState = await firstReveal.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        motionReady: document.documentElement.classList.contains("motion-ready"),
        visible: element.classList.contains("is-visible"),
        opacity: style.opacity,
        transition: style.transition,
        translate: style.translate,
      };
    });
    expect(revealState.prefersReducedMotion).toBe(true);
    expect(revealState.motionReady).toBe(true);
    expect(revealState.visible).toBe(true);
    expect(revealState.opacity).toBe("1");
    expect(revealState.transition).toBe("none");
    expect(revealState.translate).toBe("none");
  });
});