document.querySelector('#inprogress').style.display = 'none';

chrome.storage.local.get('switch_on_off', s => {
    s = s.switch_on_off || 'on';
    if (s == "on") {
        document.querySelector('#switch_on_off').checked = true;
    }
    if (s == "off") {
        document.querySelector('#switch_on_off').checked = false;
    }
});

document.querySelector('#save').addEventListener("click", async (e) => {
    document.querySelector('#save').style.display = 'none';
    document.querySelector('#inprogress').style.display = 'block';

    var switch_on_off = document.querySelector('#switch_on_off').checked;
    var host = "127.0.0.1"
    var port = 1080

    chrome.storage.local.set({ "switch_on_off": switch_on_off ? 'on' : 'off' });

    if (!switch_on_off) {
        chrome.proxy.settings.set({
            value: {
                mode: "system",
            },
        }, () => {
            setTimeout(() => {
                document.querySelector('#save').style.display = 'block';
                document.querySelector('#inprogress').style.display = 'none';
            }, 2000);
        });
        return;
    }

    chrome.proxy.settings.set({
        value: {
            mode: "fixed_servers",
            rules: {
                singleProxy: {
                    scheme: "socks5",
                    host: host,
                    port: port,
                },
            },
        },
    }, () => {
        setTimeout(() => {
            document.querySelector('#save').style.display = 'block';
            document.querySelector('#inprogress').style.display = 'none';
        }, 1000);
    });
});