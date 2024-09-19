import { http, HttpResponse } from 'msw'

const catsData = 
[
    { "type": "bank-draft", "title": "Bank Draft", "position": 0, "image": "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { "type": "bill-of-lading", "title": "Bill of Lading", "position": 1, "image": "https://cdn.pixabay.com/photo/2019/11/08/11/56/kitten-4611189_1280.jpg" },
    { "type": "invoice", "title": "Invoice", "position": 2, "image": "https://cdn.pixabay.com/photo/2022/12/31/14/32/cat-7688749_1280.jpg" },
    { "type": "bank-draft-2", "title": "Bank Draft 2", "position": 3, "image": "https://cdn.pixabay.com/photo/2022/01/18/07/38/cat-6946505_1280.jpg" },
    { "type": "bill-of-lading-2", "title": "Bill of Lading 2", "position": 4, "image": "https://cdn.pixabay.com/photo/2018/03/27/17/25/cat-3266673_1280.jpg" }
]

export const handlers = [
  http.get('/cats', () => {
    return HttpResponse.json(Array.from(catsData.values()))
  }),
 
]