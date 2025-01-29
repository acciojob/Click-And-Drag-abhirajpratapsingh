// Your code here.
const items = document.querySelectorAll('.item');
let dragging = null;
let offsetX, offsetY;

items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    dragging = item;
    offsetX = e.clientX - item.getBoundingClientRect().left;
    offsetY = e.clientY - item.getBoundingClientRect().top;

    // Make the dragged element absolute and above others
    item.style.position = 'absolute';
    item.style.zIndex = '1000';
    document.body.appendChild(item);

    // Add mousemove and mouseup listeners once dragging starts
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
  });
});

function dragMove(e) {
  if (dragging) {
    // Set the new position of the dragged item based on mouse position
    dragging.style.left = `${e.clientX - offsetX}px`;
    dragging.style.top = `${e.clientY - offsetY}px`;
  }
}

function dragEnd() {
  if (dragging) {
    // Restrict dragging within the parent container
    const container = document.querySelector('.items');
    const containerRect = container.getBoundingClientRect();
    const itemRect = dragging.getBoundingClientRect();

    // Calculate new left and top boundaries to keep the item within the container
    const left = Math.min(Math.max(itemRect.left - containerRect.left, 0), containerRect.width - itemRect.width);
    const top = Math.min(Math.max(itemRect.top - containerRect.top, 0), containerRect.height - itemRect.height);

    dragging.style.left = `${left}px`;
    dragging.style.top = `${top}px`;

    // Remove the absolute positioning and restore zIndex
    dragging.style.position = 'relative';
    dragging.style.zIndex = 'auto';

    // Clean up dragging state
    dragging = null;

    // Remove mousemove and mouseup listeners after dragging
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragEnd);
  }
}
