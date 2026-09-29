import { test, expect } from '../../fixtures/BaseFixture';

test.describe('SauceDemo UI Automation', () => {

  test('Verify standard user login and locked-out user login', async ({
    page,
    loginPage,
    productsPage,
  }) => {

    await test.step('Navigate to SauceDemo', async () => {
      await page.goto('/');
    });

    await test.step('Login with standard user', async () => {
      await loginPage.login(
        'standard_user',
        'secret_sauce'
      );
    });

    await test.step('Verify Products page is displayed', async () => {
      await productsPage.expectProductPageLoaded();
    });

    await test.step('Verify successful login URL', async () => {
      await expect(page).toHaveURL(/inventory\.html/);
    });

    await test.step('Navigate back to login page', async () => {
      await page.goto('/');
    });

    await test.step('Login with locked-out user', async () => {
      await loginPage.login(
        'locked_out_user',
        'secret_sauce'
      );
    });

    await test.step('Verify locked-out error message', async () => {
      await loginPage.expectLoginError(
        'Epic sadface: Sorry, this user has been locked out.'
      );
    });

    await test.step('Verify locked-out user is not logged in', async () => {
      await expect(page).not.toHaveURL(/inventory\.html/);
    });
  });


  test('Verify adding two products and sorting by price', async ({
    page,
    loginPage,
    productsPage,
  }) => {

    await test.step('Navigate to SauceDemo', async () => {
      await page.goto('/');
    });

    await test.step('Login with standard user', async () => {
      await loginPage.login(
        'standard_user',
        'secret_sauce'
      );
    });

    await test.step('Verify Products page is displayed', async () => {
      await productsPage.expectProductPageLoaded();
    });

    await test.step('Add two products to cart', async () => {
      await productsPage.addProducts(2);
    });

    await test.step('Verify cart badge shows 2', async () => {
      await productsPage.expectCartCount(2);
    });

    await test.step('Sort products by Price low to high', async () => {
      await productsPage.sortByPriceLowToHigh();
    });

    await test.step('Verify first product has the lowest price', async () => {
      const prices = await productsPage.getProductPrices();

      const firstProductPrice =
        await productsPage.getFirstProductPrice();

      expect(firstProductPrice).toBe(
        Math.min(...prices)
      );
    });
  });


  test('Verify complete checkout flow', async ({
    page,
    loginPage,
    productsPage,
    cartPage,
    checkoutInformationPage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {

    await test.step('Navigate to SauceDemo', async () => {
      await page.goto('/');
    });

    await test.step('Login with standard user', async () => {
      await loginPage.login(
        'standard_user',
        'secret_sauce'
      );
    });

    await test.step('Verify Products page is displayed', async () => {
      await productsPage.expectProductPageLoaded();
    });

    await test.step('Add two products to cart', async () => {
      await productsPage.addProducts(2);
    });

    await test.step('Verify cart badge shows 2', async () => {
      await productsPage.expectCartCount(2);
    });

    await test.step('Open shopping cart', async () => {
      await productsPage.openCart();
    });

    await test.step('Verify Cart page is displayed', async () => {
      await cartPage.expectCartPageLoaded();
    });

    await test.step('Click Checkout', async () => {
      await cartPage.clickCheckout();
    });

    await test.step(
      'Verify Checkout Information page is displayed',
      async () => {
        await checkoutInformationPage
          .expectCheckoutInformationPageLoaded();
      }
    );

    await test.step('Fill checkout information', async () => {
      await checkoutInformationPage.fillInformation(
        'Ragavi',
        'Test',
        '641001'
      );
    });

    await test.step('Continue to Checkout Overview', async () => {
      await checkoutInformationPage.clickContinue();
    });

    await test.step(
      'Verify Checkout Overview page is displayed',
      async () => {
        await checkoutOverviewPage
          .expectOverviewPageLoaded();
      }
    );

    await test.step('Click Finish', async () => {
      await checkoutOverviewPage.clickFinish();
    });

    await test.step('Verify order completion message', async () => {
      await checkoutCompletePage.expectOrderCompleted();
    });
  });

});

