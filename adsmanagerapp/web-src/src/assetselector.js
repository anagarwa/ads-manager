let imsInstance = null;

const imsProps = {
    imsClientId: "ngdm_test_client",
    imsScope: "AdobeID,openid,read_organizations,additional_info.projectedProductContext",
    redirectUrl: window.location.href,
    modalMode: true,
    env:"STAGE",
    // Optional parameters:
    // modalMode: false, // set to false to open in a full page reload flow
    // adobeImsOptions: {
    //     modalSettings: {
    //         allowOrigin: window.location.origin,
    //     },
    //     useLocalStorage: true,
    // },
    // onImsServiceInitialized: (service) => {
    //     console.log("onImsServiceInitialized", service);
    // },
    // onAccessTokenReceived: (token) => {
    //     console.log("onAccessTokenReceived", token);
    // },
    // onAccessTokenExpired: () => {
    //     console.log("onAccessTokenError");
    //     // re-trigger sign-in flow
    // },
    // onErrorReceived: (type, msg) => {
    //     console.log("onErrorReceived", type, msg);
    // },
};

/**
 * Registers the IMS token service with the PureJSSelectors library, which is required when using `renderAssetSelectorWithAuthFlow` with a pop-up.
 *
 * NOTE: If you don't register the token service and your redirectUrl does not match the one you registered with the imsClientId,
 * the sign-in flow will fail and a page reload might be required. If you use a different redirectUrl where the IMS provider will
 * redirect to after the user signs in, you must also load this function on that redirect page for the pop-up to work correctly.
 *
 * It is recommended that you call `registerAssetsSelectorsAuthService` on page load.
 *
 * @function load
 */
function registerImsAuthService() {
    // Register the IMS token service with PureJSSelectors.
    const registeredTokenService = PureJSSelectors.registerAssetsSelectorsAuthService(imsProps);

    // Store the token service instance in `imsInstance` for use outside of the asset selector.
    // Some helpful functions:
    // - registeredTokenService.getAccessToken() - to get the current access token
    // - registeredTokenService.triggerAuthFlow() or registeredTokenService.signIn() - to trigger the sign-in flow based on the imsProps modalMode setting (true/false);
    // - registeredTokenService.signOut() - to sign out the user and remove the token
    // - registeredTokenService.refreshToken() - to refresh the existing token
    imsInstance = registeredTokenService;
};

// Must be register token service before the selectors are rendered.
registerImsAuthService();

/**
 * Closes the Asset Selector dialog when it is called.
 * This is a helper function used by Asset Selectors UI.
 *
 * @function onClose
 */
function onClose() {
    const selectorDialog = document.getElementById('asset-selector-dialog');
    selectorDialog.close();
}

/**
 * Closes the Destination Selector dialog when it is called.
 * This is a helper function used by Asset Selectors UI.
 *
 * @function onClose
 */
function destinationSelectorOnClose() {
    const selectorDialog = document.getElementById('destination-selector-dialog');
    selectorDialog.close();
}

/**
 * Handles the selected asset when it is called.
 * This is a helper function used by Asset Selectors UI.
 *
 * @function handleSelection
 * @param {object} selection - The selected asset.
 */
function handleSelection(selection) {
    console.log('Selected asset:', selection);

    const thumbnailsContainer = document.getElementById('selected-thumbnails'); // Assuming there's an element with this ID to contain the thumbnails

    // Clear existing thumbnails before displaying new ones
    thumbnailsContainer.innerHTML = '';

    // Loop through each selected asset and create thumbnail elements
    selection.forEach(asset => {
        const thumbnailUrl = getThumbnailUrl(asset); // Assuming you have a function to extract the appropriate thumbnail URL
        if (thumbnailUrl) {
            const img = document.createElement('img');
            img.src = thumbnailUrl;
            img.alt = asset.name; // Set alt attribute for accessibility
            img.style.width = '100px'; // Set width as needed
            img.style.height = '100px'; // Set height as needed

            // Append the thumbnail image to the container
            thumbnailsContainer.appendChild(img);
        }
    });
    const estimatedCostInput = document.getElementById('estimated-cost');
    estimatedCostInput.innerText = "$5000";
    onClose();
};

function getThumbnailUrl(asset) {
    // Check if the selection object contains a _links property and it has rendition URLs
    if (asset._links && asset._links['http://ns.adobe.com/adobecloud/rel/rendition']) {
        // Select the first link (assuming it's a small thumbnail) and return its href
        const renditions = asset._links['http://ns.adobe.com/adobecloud/rel/rendition'];
        let maxThumbnail = renditions[0]; // Initialize with the first rendition
        for (let i = 1; i < renditions.length; i++) {
            if (renditions[i].height > maxThumbnail.height) {
                maxThumbnail = renditions[i]; // Update maxThumbnail if higher height is found
            }
        }
        return maxThumbnail.href;
    }

    // If no suitable thumbnail URL is found, you can provide a default fallback or handle it accordingly
    return ''; // Return an empty string or any default URL
}



/**
 * Handles the selected path when it is called.
 * This is a helper function used by Asset Selectors UI.
 *
 * @function handleOnConfirm
 * @param {object} selection - The selected path.
 */
function handleOnConfirm(selection) {
    console.log('Selected path:', selection);
    destinationSelectorOnClose();
};


/**
 * Renders an asset selector user interface using the PureJSSelectors library.
 * When the asset selector is ready to be displayed, it will be shown in a dialog box.
 *
 * @async
 * @function renderAssetSelectorWithImsFlow
 * @returns {Promise<void>}
 */
async function renderAssetSelectorWithImsFlow() {

    /**
     * Props for the asset selector UI.
     *
     * @typedef {Object} AssetSelectorProps
     * @property {string} discoveryURL - The URL for the AEM Discovery service.
     * @property {string} imsOrg - The IMS organization ID for the user.
     * @property {string} apiKey - The API key for the AEM Assets backend.
     * @property {Function} onClose - A callback function to be called when the asset selector dialog is closed.
     * @property {Function} handleSelection - A callback function to be called when an asset is selected.
     * @property {Function} handleNavigateToAsset - A callback function to be called when the user clicks on an asset to navigate to it.
     * @property {string} env - The environment where the asset selector is being used.
     */

    /** @type {AssetSelectorProps} */
    const assetSelectorProps = {
        "onClose": onClose,
        "handleSelection": handleSelection,
        "env": "STAGE",
        "repositoryId":"delivery-p47604-e144858-cmstg.adobeaemcloud.com",
        //imsOrg:"999F6D0B617C10B80A495E2E@AdobeOrg"
    }

    // Get the container element where the asset selector will be rendered.
    const container = document.getElementById('asset-selector');
    console.log(container);

    /**
     * Renders the asset selector UI with IMS authentication, and shows the dialog when it's ready.
     *
     * @function renderAssetSelectorWithAuthFlow
     * @param {Element} container - The container element where the asset selector will be rendered.
     * @param {AssetSelectorProps} props - Props for the asset selector UI.
     * @param {Function} callback - A callback function to be called when the UI is ready to be displayed.
     */
    PureJSSelectors.renderAssetSelectorWithAuthFlow(container, assetSelectorProps, () => {
        const assetSelectorDialog = document.getElementById('asset-selector-dialog');
        assetSelectorDialog.showModal();
    });
}

/**
 * Renders a Destination Selector UI with IMS authentication.
 * The UI will use the registered IMS instance (created in registerAssetsSelectorsAuthService) to get the required tokens.
 * If a valid token is not present, the sign-in flow will be triggered in either pop-up or full page reload mode based on the configurations set in the imsProps.
 * Note that registerAssetsSelectorsAuthService must be called before triggering this flow.
 * For best user experience, it is recommended that registerAssetsSelectorsAuthService is called on page load prior to calling this function.
 *
 * @async
 * @function renderDestinationSelectorWithImsFlow
 * @returns {Promise<void>}
 */
async function renderDestinationSelectorWithImsFlow() {
    /**
     * Props for the Destination Selector UI.
     *
     * @typedef {Object} DestinationSelectorProps
     * @property {string} imsOrg - The IMS organization ID for the user.
     * @property {Function} onClose - A callback function to be called when the Destination Selector dialog is closed.
     * @property {Function} handleSelection - A callback function to be called when a destination is selected.
     * @property {string} env - The environment where the Destination Selector is being used.
     */

    /** @type {DestinationSelectorProps} */
    const props = {
        "onClose": destinationSelectorOnClose,
        "onConfirm": handleOnConfirm,
    }

    // Get the container element where the Destination Selector will be rendered.
    const container = document.getElementById('destination-selector');

    /**
     * Renders the Destination Selector UI with IMS authentication, and shows the dialog when it's ready.
     *
     * @function renderDestinationSelectorWithAuthFlow
     * @param {Element} container - The container element where the Destination Selector will be rendered.
     * @param {DestinationSelectorProps} props - Props for the Destination Selector UI.
     * @param {Function} callback - A callback function to be called when the UI is ready to be displayed.
     */
    PureJSSelectors.renderDestinationSelectorWithAuthFlow(container, props, () => {
        const destinationSelectorDialog = document.getElementById('destination-selector-dialog');
        destinationSelectorDialog.showModal();
    });
}

/**
 * Initiates the logout flow for the current IMS user using the registered IMS instance.
 *
 * @async
 * @function logoutImsFlow
 */
async function logoutImsFlow() {
    console.log("Signing out...", imsInstance);

    // Call the signOut method on the registered IMS instance to initiate the logout flow.
    await imsInstance.signOut();
}