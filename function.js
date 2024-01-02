function archiveConversation(index, items) {
  // If the current array is depleted, then repopulate the array with new items.
  if (index >= items.length) {
    setTimeout(refresh, 1000);
    return;
  }
  // Begins at 0 and ++increment on each iteration.
  const item = items[index];

  // Set window to automatically confirm true when confirmation window appears.
  const originalConfirm = window.confirm;
  window.confirm = () => true;

  // Click the settings cog to open the modal
  item.click();

  // Wait for the modal to appear and then click the first <a> tag inside it
  setTimeout(() => {
    let modal = item
      .closest(".conversation-settings")
      .querySelector(".settings-window.vertical-choice");
    let link = modal.querySelector("a");
    if (link) {
      link.click();
      console.log("Conversation archived.");
    }

    // Restore original confirmation setting to replay on next modal.
    window.confirm = originalConfirm;

    // Process the next item after a delay
    setTimeout(() => archiveConversation(++index, items), 1000); // Delay between each settings cog click
  }, 500); // Delay after clicking to wait for modal to appear
}

// Check for new conversations
function refresh() {
  let items = document.querySelectorAll(".settings-cog");
  console.log("Checking for new items, found:", items.length);

  //
  if (items.length > 0) {
    // Run the function to archive each conversation starting at index 0 and on the new array of items.
    archiveConversation(0, items);
  } else {
    // If there are no remaining conversations, display this to the user.
    console.log("There are no more conversations to archive.");
  }
}

// Run function
refresh();
