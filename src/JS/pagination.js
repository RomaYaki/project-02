const cardElem = document.querySelector('.js-card');
const paginationElement = document.getElementById('pagination');
const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');
let currentPage = 1;
let pageCount;
const quontityPages = 5;
let rows = 20;

function resetCurrentPage() {
  currentPage = 1;
}

export function createPagination(totalPages, listItems, callback, searchQuery) {
  paginationElement.innerHTML = '';
  resetCurrentPage();
  arrowLeft.removeEventListener('click', onArrowLeftClick);
  arrowRight.removeEventListener('click', onArrowRightClick);

  function setupPagination(items, wrapper, rowsPerPage) {
    wrapper.innerHTML = '';

    pageCount = totalPages;
    let maxLeftPage = currentPage - Math.floor(quontityPages / 2);
    let maxRightPage = currentPage + Math.floor(quontityPages / 2);

    if (maxLeftPage < 1) {
      maxLeftPage = 1;
      maxRightPage = quontityPages;
    }

    if (maxRightPage > totalPages) {
      maxLeftPage = totalPages - (quontityPages - 1);

      if (maxLeftPage < 1) {
        maxLeftPage = 1;
      }
      maxRightPage = totalPages;
    }

    for (let i = 1; i <= totalPages; i++) {
      if (maxLeftPage !== 1 && i == 1) {
        let btn = paginationButton(i, items);
        wrapper.appendChild(btn);
      }

      if (maxRightPage !== totalPages && i == totalPages) {
        let btn = paginationButton(i, items);
        wrapper.appendChild(btn);
      }

      if (i >= maxLeftPage && i <= maxRightPage) {
        let btn = paginationButton(i, items);
        wrapper.appendChild(btn);
      }

      // add ...
      if (
        totalPages >= 6 &&
        i == 1 &&
        currentPage !== 1 &&
        currentPage !== 2 &&
        currentPage !== 3
      ) {
        const threeDotsEl = addThreeDotsBlock();
        wrapper.insertBefore(threeDotsEl, wrapper[wrapper.length - 2]);
      }

      if (
        pageCount >= 7 &&
        i == pageCount - 1 &&
        currentPage !== pageCount &&
        currentPage !== pageCount - 2 &&
        currentPage !== pageCount - 1
      ) {
        const threeDotsEl = addThreeDotsBlock();
        wrapper.insertBefore(threeDotsEl, wrapper[1]);
      }
    }
  }

  // create ...
  function addThreeDotsBlock() {
    const threeDots = document.createElement('div');
    threeDots.classList.add('threeDots');
    threeDots.innerText = '...';
    return threeDots;
  }

  function paginationButton(page, items) {
    let button = document.createElement('button');
    button.innerText = page;

    if (currentPage == page) button.classList.add('active');

    button.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      currentPage = page;
      callback(cardElem, currentPage, searchQuery);

      let current_btn = document.querySelector('.pagenumbers button.active');
      current_btn.classList.remove('active');

      button.classList.add('active');
      setupPagination(listItems, paginationElement, rows);
      hideExtremeButtons(totalPages);
    });

    return button;
  }

  // Arrow left
  function onArrowLeftClick() {
    if (currentPage > 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      currentPage--;
      setupPagination(listItems, paginationElement, rows);
      callback(cardElem, currentPage, searchQuery);
    }

    disableArrowBtn(totalPages);
    hideExtremeButtons(totalPages);
  }

  // Arrow right
  function onArrowRightClick() {
    if (currentPage < totalPages) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      currentPage++;
      setupPagination(listItems, paginationElement, rows);
      callback(cardElem, currentPage, searchQuery);
    }
    disableArrowBtn(totalPages);
    hideExtremeButtons(totalPages);
  }

  setupPagination(listItems, paginationElement, rows);
  arrowLeft.onclick = onArrowLeftClick;
  arrowRight.onclick = onArrowRightClick;

  hideExtremeButtons(totalPages);
  disableArrowBtn(totalPages);
}

function hideExtremeButtons(totalPages) {
  try {
    if (/Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // код для мобильных устройств
      const allPaginationBtns = document.querySelectorAll('#pagination button');
      if (currentPage > 3) {
        allPaginationBtns[0].classList.add('hide');
      } else {
        allPaginationBtns[0].classList.remove('hide');
      }

      if (currentPage < totalPages - 3) {
        allPaginationBtns[allPaginationBtns.length - 1].classList.add('hide');
      } else {
        allPaginationBtns[allPaginationBtns.length - 1].classList.remove('hide');
      }
    }
  } catch (error) {}
}

paginationElement.addEventListener('click', disableArrowBtnAfterPageClick);

function disableArrowBtnAfterPageClick(e) {
  if (e.target.tagName != 'BUTTON') {
    return;
  } else {
    disableArrowBtn(pageCount);
  }
}

function disableArrowBtn(totalPages) {
  if (currentPage === 1) {
    arrowLeft.classList.add('disabled-arrow');
  } else {
    arrowLeft.classList.remove('disabled-arrow');
  }

  if (currentPage === totalPages) {
    arrowRight.classList.add('disabled-arrow');
  } else {
    arrowRight.classList.remove('disabled-arrow');
  }
}
