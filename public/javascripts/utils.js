var SUCCESS_MSG_TIME = 2000;
var TIME_OUT = 5000;
async function fetchData(url, options = {}, needAck) {
    try {
        if (needAck) { showLoadingModal(); }
        let response = await fetchWithTimeout(url, options);
        if (response.ok && needAck) {
            showSuccessActionModal();
            setTimeout(function () {
                hideSuccessActionModal();
            }, SUCCESS_MSG_TIME);
            return response;
        } else if (response.ok) {
            return response;
        } else {
            throw error;
        }
    } catch (error) {
        showErrorModal(error);
    }
}

async function fetchWithTimeout(resource, options = {}) {
    const { timeout = TIME_OUT } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
        ...options,
        signal: controller.signal
    });
    clearTimeout(id);
    return response;
}


function showLoadingModal() {
    $("#loadingModal").modal('show');
}

function showSuccessActionModal() {
    $("#loadingModal").modal('hide');
    $("#successModal").modal('show');
}

function showErrorModal() {
    $("#loadingModal").modal('hide');
    $("#errorModal").modal('show');
    $("#errorModal").on('hide.bs.modal', function () {
        return false;
    });
}

function hideSuccessActionModal() {
    $("#successModal").modal('hide');
    window.location.reload();
}

