# account-manager-api

## Build

npm install
npm run build

## Debugging
From git bash
```bash
export DB_CONNECT_STRING="mongodb+srv://<username>:<password>@cluster0.2xjwj.mongodb.net/<dbname>?retryWrites=true&w=majority"
export RECURLY_API_KEY="API_KEY"

export AWS_ACCESS_KEY_ID="AWS_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="AWS_SECRET_ACCESS_KEY"
```
then launch VS Code.
```bash
code .
```
last start the debugger.