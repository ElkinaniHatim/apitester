angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("endpoint_list.html","<div class=\"col-md-12\">\n	<div class=\"input-group\">\n		<div class=\"input-group-addon\"><i class=\"glyphicon glyphicon-search\"></i></div>\n		<input ng-change=\"updateList()\" ng-model=\"search\" class=\"form-control\">\n	</div>\n</div>\n<div class=\"col-md-12\">\n	<div>\n		<ul class=\"nav nav-tabs\">\n		  <li role=\"presentation\" ng-click=\"selected = \'endpoints\'\" ng-class=\"{\'active\' : selected == \'endpoints\'}\"><a>Enpoints</a></li>\n		  <li role=\"presentation\" ng-click=\"selected = \'paths\'\" ng-class=\"{\'active\' : selected == \'paths\'}\"><a>Paths</a></li>\n		  <li role=\"presentation\" ng-click=\"selected = \'entities\'\" ng-class=\"{\'active\' : selected == \'entities\'}\"><a>Entities</a></li>\n		</ul>\n	</div>\n	<div ng-if=\"selected == \'endpoints\'\" ng-repeat=\"endpoint in endpoints\"  style=\"padding-bottom: 30px;\">\n		<div>\n			<h3>\n				<button ng-repeat=\"method in endpoint.methods\" class=\"btn\" ng-class=\"{\'btn-success\': method == \'GET\', \'btn-danger\': method == \'DELETE\', \'btn-primary\': method == \'POST\', \'btn-info\': method == \'PUT\'}\">{{method}}</button>\n				{{endpoint.pattern}}\n			</h3>\n		</div>\n		<div endpoint=\"endpoint\">\n		</div>\n	</div>\n	<div ng-if=\"selected == \'paths\'\"> \n		<div ng-repeat=\"path in paths\"  style=\"padding-bottom: 30px;\">\n			<div path=\"path\">\n			</div>\n		</div>\n	</div>\n</div>");
$templateCache.put("method_detail.html","	<div>\n		<i class=\"pull-right glyphicon\" ng-class=\"{\'glyphicon-eye-open\' : details, \'glyphicon-eye-close\' : !details }\" ng-click=\"details = !details\" style=\"margin: 5\"></i>\n		<i class=\"pull-right glyphicon glyphicon-play\" ng-click=\"select()\" style=\"margin: 5\"></i>\n	</div>\n	<div class=\"form-group\">\n		<label>Controller Method</label>\n		<div>\n			{{endpoint.methodInfo.className}}.{{endpoint.methodInfo.methodName}}\n		</div>\n	</div>\n	<div class=\"form-group\">\n		<label>Description</label>\n		<div ng-if=\"endpoint.methodInfo.descriptions.length == 0\">\n			<i>This method has no description</i>\n		</div>\n		<div ng-if=\"endpoint.methodInfo.descriptions.length > 0\" class=\"well well-sm\">\n			<div ng-repeat=\"description in endpoint.methodInfo.descriptions\">\n				<p markdown=\"description\">\n				</p>\n			</div>\n		</div>\n	</div>\n	<div class=\"form-group\">\n		<label><i class=\"glyphicon glyphicon-chevron-right\"> </i>  Parameters</label>\n		<div ng-if=\"endpoint.methodInfo.params.length==0\">\n			<i>This method has no parameters.</i>\n		</div>\n		<div ng-if=\"endpoint.methodInfo.params.length>0\">\n			<table class=\"table table-compact\">\n				<tbody ng-repeat=\"param in endpoint.methodInfo.params\">\n					<tr>\n						<td width=\"15%\">\n							<button class=\"btn btn-sm btn-default\">{{param.paramType}}</button>\n						</td>\n						<td>	\n							<i class=\"glyphicon glyphicon-exclamation-sign\" ng-if=\"param.required\"></i>\n						</td>\n						<td>	\n							{{param.name}}\n						</td>\n						<td>	\n							{{param.typeShort}}<span ng-if=\"param.collection\">[]</span>\n						</td>\n						<td>\n							<div ng-if=\"param.description\" markdown=\"param.description\">\n							</div>\n						</td>\n					</tr>\n					<tr ng-show=\"!param.primitive && details\">\n						<td colspan=\"5\"><pre>{{param.object | json}}</pre></td>\n					</tr>\n				</tbody>\n			</table>	\n		</div>\n	</div>\n	<div class=\"form-group\">\n		<label><i class=\"glyphicon glyphicon-list\"> </i>  Headers</label>\n		<div ng-if=\"endpoint.methodInfo.headerInfos.length==0\">\n			<i>This method has no headers.</i>\n		</div>\n		<div ng-if=\"endpoint.methodInfo.headerInfos.length>0\">\n			<table class=\"table table-compact\">\n				<tbody ng-repeat=\"headerInfo in endpoint.methodInfo.headerInfos\">\n					<tr>\n						<td width=\"15%\">\n							<button class=\"btn btn-sm btn-default\">{{headerInfo.name}}</button>\n						</td>\n						<td>	\n							{{headerInfo.description}}\n						</td>\n					</tr>\n				</tbody>\n			</table>	\n		</div>\n	</div>\n	<div class=\"form-group\">\n		<label><i class=\"glyphicon glyphicon-chevron-left\"> </i>  Returns</label>\n		<div ng-if=\"endpoint.methodInfo.returnType.type==\'void\'\">\n			<i>This method does not return anything</i>\n		</div>\n		<div ng-if=\"endpoint.methodInfo.returnType.type!=\'void\'\">\n			<table class=\"table table-compact\">\n				<tr>\n					<td width=\"15%\">\n						<button class=\"btn btn-sm btn-default\">{{endpoint.methodInfo.returnType.paramType}}</button>\n					</td>\n					<td>	\n						{{endpoint.methodInfo.returnType.typeShort}}<span ng-if=\"endpoint.methodInfo.returnType.collection\">[]</span>\n					</td>\n				</tr>\n				<tr ng-show=\"details\">\n					<td colspan=\"2\"><div ng-if=\"details\"></div><pre>{{endpoint.methodInfo.returnType.object | json}}</div></pre></td>\n				</tr>\n			</table>	\n		</div>\n	</div>	\n	<div class=\"form-group\">\n		<label>Return Status</label>\n		<table class=\"table table-compact\">\n			<tr ng-repeat=\"returnStatus in endpoint.methodInfo.returnStatus\">\n				<td width=\"15%\">\n					<button class=\"btn btn-sm btn-success\" ng-class=\"{\'btn-info\' : returnStatus.status > 299, \'btn-warning\' : returnStatus.status > 399, \'btn-danger\' : returnStatus.status > 499}\">{{returnStatus.status}}</button>\n				</td>\n				<td>	\n					{{returnStatus.name}}\n				</td>\n				<td>	\n					{{returnStatus.description}}\n				</td>\n			</tr>\n		</table>	\n	</div>	\n	");
$templateCache.put("method_tester.html","	<div>\n		<h3>\n			<button ng-repeat=\"method in selectedEndpoint.methods\" class=\"btn\" ng-class=\"{\'btn-success\': method == \'GET\', \'btn-danger\': method == \'DELETE\', \'btn-primary\': method == \'POST\', \'btn-info\': method == \'PUT\'}\">{{method}}</button>\n			{{selectedEndpoint.pattern}}\n		</h3>\n	</div>\n	<div class=\"form-group\">\n		<label>Controller Method</label>\n		<div>\n			{{endpoint.methodInfo.className}}.{{endpoint.methodInfo.methodName}}\n		</div>\n	</div>\n	<div>\n		Actual TESTER goes in here ... \n	</div>	");
$templateCache.put("path_info_detail.html","	<div>\n		<h3>\n			{{path.path}}\n		</h3>\n		<i class=\"pull-right glyphicon\" ng-class=\"{\'glyphicon-eye-open\' : details, \'glyphicon-eye-close\' : !details }\" ng-click=\"details = !details\" style=\"margin: 5\"></i>\n	</div>\n	<div>\n		<button ng-click=\"selectMethod(method)\" ng-repeat=\"method in path.methods\" class=\"btn\" ng-class=\"{\'btn-success\': method == \'GET\', \'btn-danger\': method == \'DELETE\', \'btn-primary\': method == \'POST\', \'btn-info\': method == \'PUT\', \'active\' : method == selectedMethod}\" style=\"margin: 5px\">{{method}}</button>	\n	</div>\n	<div>\n		<div ng-repeat=\"mapping in mappings\"  style=\"padding-bottom: 30px;\">\n			<div endpoint=\"mapping\">\n		</div>\n	</div>\n	");}]);