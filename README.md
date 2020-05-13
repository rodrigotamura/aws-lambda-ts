# Script TS em Lambda AWS

## Requisitos:
- AWS Cli;
- Typescript package (`npm i -g typescript`);
- tsc-node package para transpilação (`npm i -g ts-node`);
- Ter configurado o ambiente: `aws configure`, e será necessário informar a AWS Access Key ID, Secret e region (use o `us-east-2`).

## Importante

Antes de criar qualquer Lambda, será necessário criar um *role*:

`aws iam create-role --role-name lambda-example --assume-role-policy-document '{"Version": "2012-10-17","Statement": [{ "Effect": "Allow", "Principal": {"Service": "lambda.amazonaws.com"}, "Action": "sts:AssumeRole"}]}'`

Foi criado um *role* chamado **_lambda-example_**

Logo após, precisamos adicionar ao **policy** que o role criado poderá executar Lambdas: 

`aws iam attach-role-policy --role-name lambda-example --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole`

## Comandos básicos

Após finalizar o script TS da Lambda, e transpilar para a pasta *dist*, temos que compactar num arquivo zip: `zip function.zip index.js`

### Criando nova Lâmbda

`aws lambda create-function --function-name nome-da-lambda --zip-file fileb://function.zip --handler index.handler --runtime nodejs12.x --role arn:aws:iam::123456789012:role/lambda-example`

Sendo que o `--role` é o valor do ARN (Amazon Resource Name) que pode ser obtido dentro do dash do role lambda-example.

### Invokando a Lambda

`aws lambda invoke --function-name first-lambda --payload '{"rodrigo": "tamura"}' response.json`

Sendo que:
- `--payload`: seria o parâmetro `event` passado no `handler(event)`;
- `response.json`: nome do arquivo que será salvo no diretório atual (em que se executou o comando) que conterá o valor retornado da Lambda.

### Alterando uma Lambda existente

Após realizar a alteração do script TS, e fazer a transpilação para o diretório `./dist`, execute o comando abaixo:

`aws lambda update-function-code --function-name first-lambda --zip-file fileb://function.zip`

### Roadmap do projeto

❎ Lambda básico