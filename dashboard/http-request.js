const noop = () => {};

function httpRequest({
    method = 'GET',
    headers,
    url,
    body,
    type = 'json',
    onSuccess = noop,
    onError = noop,
}) {
    const request = new XMLHttpRequest();

    request.open(method, url);
    request.responseType = type;

    if (headers) {
        Object.keys(headers).forEach(headerName => {
            request.setRequestHeader(headerName, headers[headerName]);
        });
    }

    request.send(body);

    request.addEventListener('load', () => {
        if (request.status === 200) {
            onSuccess(request.response);
        } else {
            onError(request.response || 'Неизвестная ошибка');
        }
    });

    request.addEventListener('error', () => {
        onError('Сеть недоступна');
    });

}
