- `cloudtryx/` – React frontend
- `cldtrx/` – Django backend


# run react frontend


```bash
cd cloudtryx
npm install
npm run dev
```

# run django application
```bash
cd cldtrx
pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
