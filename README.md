- `cloudtryx/` – React frontend
- `cldtrx/` – Django backend


# run react frontend


```bash
cd cloudtryx
npm install
npm run dev
```

open another terminal with the same route
create a vitrual environment first to run django application

```bash
python -m venv myenv
myenv/Scripts/activate
```


# run django application
```bash
cd cldtrx
pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
