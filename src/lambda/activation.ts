import { ListRolesCommand } from "@aws-sdk/client-iam";
import * as vscode from "vscode";
import { iamClient } from "../clients/iamClient";
import { PickPrompter } from "../ui/prompter";
import { deployLambdaFunction } from "./commands/deployLambda";
import { LambdaExplorer } from "./explorer/LambdaExplorer";

export async function activateLambda(context: vscode.ExtensionContext) {
  const lambdaTreeProvider = new LambdaExplorer();

  let lambdaTree = vscode.window.registerTreeDataProvider(
    "awsLambdaExplorer",
    lambdaTreeProvider
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lambda.refreshEntry", () => {
      lambdaTreeProvider.refresh();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "lambda.createFunction",
      deployLambdaFunction
    )
  );

  context.subscriptions.push(lambdaTree);
}
