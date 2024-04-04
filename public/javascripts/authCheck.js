// authentication check to be used on each page except for login
// include above all other scripts that depend on user being logged in.
async function checkAuthAndRedirect() {
    try {
        const response = await fetch('/users/status');
        const {loggedIn} = await response.json();
        if (!loggedIn) {
            // If not logged in, redirect to the login page
            window.location.href = '/index.html';
            return;
        }
        // Optional: Call a function to execute if the user is authenticated
        if (window.onAuthSuccess) {
            window.onAuthSuccess();
        }
    } catch (error) {
        console.error('Error checking authentication status:', error);
    }
}

checkAuthAndRedirect();


// example of the optional part of code above^^^ this would be at the bottom of the html files.
//<script>
//    // This function will be called if the user is authenticated
//    window.onAuthSuccess = function() {
//    loadUserData();
//    loadCharts();
//};

//    function loadUserData() {
    // Fetch and display user data
//    console.log('Loading user data...');
//}

//    function loadCharts() {
    // Fetch and render charts based on the authenticated user's data
//    console.log('Loading charts...');
//}
//</script>
