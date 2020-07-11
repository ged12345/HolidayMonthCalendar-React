import iconfinder from "../api/iconfinder.js";

// Handles the first REST API GET call to etrieve the icon details and
// downloadUrl
async function handleIconDetailsResponse(response) {
    const icons = response.data.icons;
    console.log(icons);

    if (icons.length > 0) {
        const randomIconIndex =
            Math.ceil((Math.random() * 100) % icons.length) - 1;

        const rasterSizesLength = icons[randomIconIndex].raster_sizes.length;

        // If we have a list of raster images to download for our searched icon
        if (rasterSizesLength > 0) {
            const downloadUrl = icons[randomIconIndex].raster_sizes[
                rasterSizesLength - 1
            ].formats[0].download_url.replace(
                "https://api.iconfinder.com",
                "http://localhost:8010/proxy"
            );
            // TODO: Remove the above proxy info when we finalize code

            return await handleIconDownloadResponse(downloadUrl);
        } else {
            return null;
        }
    }
}

// Handles the downloading of the icon image from its dowload URL.
// The icon raw data is converted into a blob, which is then converted to
// a base64 data string.
async function handleIconDownloadResponse(downloadUrl) {
    return await iconfinder
        .get(downloadUrl, {
            responseType: "blob",
        })
        .then(async (response) => {
            if (response) {
                console.log(response);
                const blob = new Blob([response.data], {
                    type: "image/jpeg",
                });

                return await convertBlobToBase64(blob);
            }
        });
}

// Convert the downloaded blob jpeg into raw base64 data
async function convertBlobToBase64(blob) {
    return new Promise(async (resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = (event: any) => {
            const data = event.target.result;
            var base64data = data;

            resolve(base64data);
        };
    });
}

// Makes the initial term query for the icon and then
// returns our base64 icon data.
export default async (term) => {
    return await iconfinder
        .get(
            "http://localhost:8010/proxy/v4/icons/search",
            //"https://api.iconfinder.com/v4/icons/search",
            // TODO: Remove the above proxy info when we finalize code
            {
                params: { query: term, count: 10 },
            }
        )
        .then(async (response) => {
            return await handleIconDetailsResponse(response);
        });
};
