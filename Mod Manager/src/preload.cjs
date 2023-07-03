const { contextBridge, ipcRenderer, shell } = require("electron")

contextBridge.exposeInMainWorld("fs", require("fs-extra"))
contextBridge.exposeInMainWorld("isFile", path => require("fs-extra").statSync(path).isFile())
contextBridge.exposeInMainWorld("originalFs", require("original-fs"))
contextBridge.exposeInMainWorld("path", require("path"))
contextBridge.exposeInMainWorld("klaw", require("klaw-sync"))
contextBridge.exposeInMainWorld("Buffer", {
	isBuffer: Buffer.isBuffer,
	from: Buffer.from
})
contextBridge.exposeInMainWorld("ipc", {
	send: (channel, data) => {
		ipcRenderer.send(channel, data)
	},
	sendSync: (channel, data) => {
		ipcRenderer.sendSync(channel, data)
	},
	receive: (channel, func) => {
		ipcRenderer.on(channel, (event, ...args) => func(...args))
	},
	receiveOnce: (channel, func) => {
		ipcRenderer.once(channel, (event, ...args) => func(...args))
	}
})
contextBridge.exposeInMainWorld("openExternalLink", shell.openExternal)
contextBridge.exposeInMainWorld("sanitizeHtml", require("sanitize-html"))
contextBridge.exposeInMainWorld("child_process", require("child_process"))
contextBridge.exposeInMainWorld("nodeVersion", process.versions.node)
