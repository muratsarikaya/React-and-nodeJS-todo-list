const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors());

app.get('/api/task-list', function (req, res) {
    res.send([{
        "_id": "l1shf9fz",
        "job_name": "Menu açılmaması problemin düzeltme yapılması",
        "job_priority": 1
    }, {
        "_id": "l1sjyfgs",
        "job_name": "Resimler mobil görünümde küçük görünmesi",
        "job_priority": 2
    }, {"_id": "l1sfwn3s", "job_name": "Anasayfa'ya dataların gelmemesi", "job_priority": 1}, {
        "_id": "l1sfj930",
        "job_name": "Yazı font büyüklüklerinin ayarlanması",
        "job_priority": 3
    }, {"_id": "l1sjyr1a", "job_name": "Anasayfa Popup eklenmesi", "job_priority": 3}])
})

app.listen(3001)
