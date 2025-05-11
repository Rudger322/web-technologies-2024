document.addEventListener('DOMContentLoaded', () => {
  const parents = document.querySelectorAll('.menu-item.has-children');
  parents.forEach(li => {
    const txt = li.firstChild;
    const span = document.createElement('span');
    span.textContent = txt.textContent.trim();
    li.replaceChild(span, txt);

    li.addEventListener('click', e => {
      li.classList.toggle('open');
      e.stopPropagation(); 
    });
  });
});
