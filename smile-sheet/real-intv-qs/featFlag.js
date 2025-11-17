// Problem: https://www.youtube.com/watch?v=pxPVsZyMcb4&t=769s

const SAMPLE_FEATURES = {
  show_dialog_box: true,
  enable_new_pricing: true
};

const Cache = {
  featureFlags: {},
  timeStamp: null, // When was the cache initiated or the value was stored
};
const MAX_CACHE_TTL = 10000;


// Returns the state of all users for the current user
function fetchAllFeatures() {
  // mocking the fetch API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(SAMPLE_FEATURES);
    }, 100);
  });
}

function getFeatureState(featureName, defaultValue) {
  // write your solution here
  // First, check if stored in cache already
  const isCacheDataPresent = Object.keys(Cache.featureFlags).length;
  const isCacheDataFresh = Date.now() - Cache.timeStamp < MAX_CACHE_TTL;


  return fetchAllFeatures()
    .then(featureFlags => {
      // Store in cache
      Cache.featureFlags = featureFlags;
      Cache.timeStamp = Date.now();

      return Object.prototype.hasOwnProperty.call(featureFlags, featureName)
        ? featureFlags[featureName]
        : defaultValue;

      // Didn't do instead: return featureFlags[featureName] : defaultValue;
      // Because it can lead to: false || true -> true, whereas we wanted false
    })
    .catch(() => defaultValue);
}

// Example of usage:
getFeatureState('show_dialog_box', false).then(function (isEnabled) {
  if (isEnabled) {
    console.log('show_dialog_box enabled');
  } else {
    console.log('show_dialog_box disabled');
  }
});