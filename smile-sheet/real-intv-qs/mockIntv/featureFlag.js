/*
Problem 1: Feature Flag Resolver
You are given a mock API that returns the feature flags enabled for the current user.
const SAMPLE_FEATURES = {
  show_dialog_box: true,
  enable_new_pricing: true,
};

// returns the state of all features for the current user
function fetchAllFeatures() {
  // mocking the fetch API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(SAMPLE_FEATURES), 100);
  });
}

function getFeatureState(featureName, defaultValue) {
  // write your solution here
}


Your Task
Implement the getFeatureState function such that:
It returns the boolean state of the given featureName.
If the feature does not exist, return the provided defaultValue.
The function must work asynchronously since feature flags are fetched via an API.
The API call should be made only once, even if getFeatureState is called multiple times.
Subsequent calls should reuse cached feature data.


getFeatureState("show_dialog_box", false).then(console.log);
// true
getFeatureState("non_existing_feature", false).then(console.log);
// false
*/

const SAMPLE_FEATURES = {
  show_dialog_box: true,
  enable_new_pricing: true,
};

// returns the state of all features for the current user
function fetchAllFeatures() {
  // mocking the fetch API call
  console.log("inside API");
  return new Promise((resolve) => {
    setTimeout(() => resolve(SAMPLE_FEATURES), 100);
  });
}

let cachedFeature = undefined;

let flight = null;

let lastFetchedAt = 0;
const TTL = 5 * 1000;


async function getFeatureState(featureName, defaultValue) {
  // write your solution here

  const now = Date.now();

  if(cachedFeature && (now - lastFetchedAt < TTL)) {
    return cachedFeature[featureName] ?? defaultValue;
  }

  if(flight) {
    const features = await flight;
    cachedFeature = features;
    return features[featureName] ?? defaultValue;
  }
  flight = fetchAllFeatures();
  const features = await flight;
  cachedFeature = features;
  lastFetchedAt = Date.now();
  flight = null;

  return cachedFeature[featureName] ?? defaultValue;
}

getFeatureState("show_dialog_box", false).then(console.log);
// true

setTimeout(() => {
  getFeatureState("non_existing_feature", false).then(console.log);
}, 6000);

getFeatureState("non_existing_feature", false).then(console.log);
// false