const memesGrid = document.getElementById("memesGrid");
const loadingText = document.getElementById("loadingText");
const errorMessage = document.getElementById("errorMessage");
const inputTitle = document.getElementById("inputTitle");
const inputCategory = document.getElementById("inputCategory");
const inputRating = document.getElementById("inputRating");
const btnAdd = document.getElementById("btnAdd");

function renderMemes(memes) {
    // прячем текст загрузки
	loadingText.style.display = "none";

	if (memes.length === 0) {
		memesGrid.innerHTML = '<p class="empty-text">Мемов пока нет. Добавьте первый!</p>';
		return;
	}
    //для каждого мема создаём карточку и склеиваем в одну строку html
	memesGrid.innerHTML = memes.map((meme) => createCardHTML(meme)).join("");
}

function createCardHTML(meme) {
    // форматируем дату
	const date = new Date(meme.addedAt).toLocaleDateString('ru-RU');
    // строим строку со звёздочками рейтинга
	const stars = '⭐'.repeat(meme.rating);
	return `
        <div class="meme-card">
            <p class="meme-title">${meme.title}</p>
            <span class="meme-category">${meme.category}</span>
            <p class="meme-rating">${stars}</p>
            <p class="meme-date">Добавлено: ${date}</p>
            <button onClick="handleDelete(${meme.id})">🗑️ Удалить</button>
        </div>
    `;
}

async function loadMemes() {
	try {
		const memes = await getAllMemes();
		renderMemes(memes);
	} catch (error) {
		loadingText.style.display = "none";
		memesGrid.innerHTML = `<p class="empty-text">❌ Ошибка: ${error.message}</p>`;
	}
}

async function handleAdd() {
	const title = inputTitle.value.trim();
	const category = inputCategory.value;
	const rating = parseInt(inputRating.value);
    // очищаем предыдущую ошибку
	errorMessage.textContent = "";
    // простая проверка на клиенте
	if (!title) {
		errorMessage.textContent = "Введите название мема";
		inputTitle.focus();
		return;
	}
    // блокируем кнопку пока идёт запрос
	btnAdd.disabled = true;
	btnAdd.textContent ="Добавляем...";
	try {
		await addMeme(title, category, rating);
        // очищаем поле ввода
		inputTitle.value = "";
        // перезагружаем список
		await loadMemes()
	} catch (error) {
		errorMessage.textContent = error.message;
	} finally {
        // разблокируем кнопку в любом случае
		btnAdd.disabled = false
		btnAdd.textContent = "Добавить";
	}
}

async function handleDelete(id) {
	if (!confirm("Удалить этот мем?")) return;
	try {
		await deleteMeme(id);
		await loadMemes();
	} catch (error) {
		alert("Ошибка при удалении: " + error.message);
	}
}

btnAdd.addEventListener('click', handleAdd);

inputTitle.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') {
		handleAdd();
	}
});

loadMemes();