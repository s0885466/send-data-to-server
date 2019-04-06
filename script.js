    /*
* Отправка формы на сервер
* */

    let message = {
        loading: 'Загрузка',
        success: 'Мы с вами свяжемся в ближайшие 30 минут',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');

        /*Запрос в стандартном формате для php*/
        /*request.setRequestHeader('Content-Type',
            'application/x-www-form-urlencoded');*/

        //Запрос для отправки JSON
        request.setRequestHeader('Content-Type',
            'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        //превратим formData в JSON
        formData.forEach(function (value, key) {
            obj[key] = value;
        });

        let json = JSON.stringify(obj);

        /*request.send(formData);*/
        request.send(json);

        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4){
                statusMessage.innerText = message.loading;
            }
            else if (request.readyState === 4 && request.status == 200){
                statusMessage.innerText = message.success;
            }
            else {
                statusMessage.innerText = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++){
            input[i].value = '';
        }