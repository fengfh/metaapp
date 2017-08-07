/*Table structure for table `new_test` */

CREATE TABLE `new_test` (
  `id` varchar(36) NOT NULL,
  `created_time` datetime DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `modified_by` varchar(36) DEFAULT NULL,
  `created_by` varchar(36) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `_wen_ben` varchar(500) DEFAULT NULL,
  `_ri_qi` date DEFAULT NULL,
  `_fu_wen_ben` longtext,
  `_dai_ma` varchar(8000) DEFAULT NULL,
  `_duo_xing_wen_ben` varchar(2000) DEFAULT NULL,
  `_wen_jian_shang_chuan` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `_you_jian` varchar(255) DEFAULT NULL,
  `_tu_pian` varchar(255) DEFAULT NULL,
  `_shi_jian_chuo` datetime DEFAULT NULL,
  `_shi_fu` bit(1) DEFAULT NULL,
  `_bai_fen_bi` decimal(19,4) DEFAULT NULL,
  `_duo_xuan_xiang` varchar(255) DEFAULT 'blue',
  `_fu_dian_shu` double DEFAULT NULL,
  `_huo_bi` decimal(19,4) DEFAULT NULL,
  `_ri_qi_shi_jian` datetime DEFAULT NULL,
  `_zheng_shu` int(11) DEFAULT NULL,
  `_dan_xuan_xiang` varchar(255) DEFAULT 'M',
  `_shu_zi` decimal(19,4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `new_test` */

INSERT  INTO `metaui_template`(`id`,`name`,`entity_name`,`display_name`,`type`,`creator`,`creation_time`,`last_modified_by`,`last_modified`,`config_data`,`converter`,`template`,`priority_by`,`version`,`status`,`layout_type`,`url`,`real_path`,`description`,`data_source_type`,`sql`,`in_control`) VALUES ('00bda016-d9df-47a5-ad30-5dfdfa34adce','workflow','test','workflow','main','系统管理员','2014-05-20 10:37:00','系统管理员','2014-05-20 10:37:00','<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<form xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n    <hiddenFields>\n        <hiddenField>id</hiddenField>\n    </hiddenFields>\n    <sections>\n        <section colNum=\"2\" name=\"test\">\n            <rows capacity=\"2\">\n                <cell colspan=\"1\" contentType=\"Control\">\n                    <attrs/>\n                    <content xsi:type=\"control\" dataFieldName=\"name\" id=\"050ebb3b-066d-4038-b377-59a5a0f2eaaf\"/>\n                </cell>\n                <cell colspan=\"1\" contentType=\"Control\">\n                    <attrs/>\n                    <content xsi:type=\"control\" dataFieldName=\"WenBen\" id=\"a52024ac-def6-4750-8407-4b3639ffe142\"/>\n                </cell>\n            </rows>\n            <rows capacity=\"2\">\n                <cell colspan=\"1\" contentType=\"Control\">\n                    <attrs/>\n                    <content xsi:type=\"control\" dataFieldName=\"RiQi\" id=\"7b10b85f-08a2-4c99-93a7-1bfbbc1898e3\"/>\n                </cell>\n                <cell colspan=\"1\" contentType=\"String\">\n                    <attrs/>\n                    <content xsi:type=\"xs:string\"> </content>\n                </cell>\n            </rows>\n            <rows capacity=\"2\">\n                <cell colspan=\"2\" contentType=\"Control\">\n                    <attrs/>\n                    <content xsi:type=\"control\" dataFieldName=\"FuWenBen\" id=\"1380900f-8a6e-4d20-9138-af3526850935\"/>\n                </cell>\n            </rows>\n            <rows capacity=\"2\">\n                <cell colspan=\"1\" contentType=\"Control\">\n                    <attrs/>\n                    <content xsi:type=\"control\" dataFieldName=\"DaiMa\" id=\"22029a4a-9402-4ef5-a134-54c6fab84f8d\"/>\n                </cell>\n                <cell colspan=\"1\" contentType=\"Control\">\n                    <attrs/>\n                    <content xsi:type=\"control\" dataFieldName=\"DuoXingWenBen\" id=\"226b4bf2-b7d1-4d41-9c86-50c38c8a3031\"/>\n                </cell>\n            </rows>\n            <rows capacity=\"2\">\n                <cell colspan=\"1\" contentType=\"Control\">\n                    <attrs/>\n                    <content xsi:type=\"control\" dataFieldName=\"WenJianShangChuan\" id=\"68763171-134e-49fb-a858-ea26d0c2bd9f\"/>\n                </cell>\n                <cell colspan=\"1\" contentType=\"Control\">\n                    <attrs/>\n                    <content xsi:type=\"control\" dataFieldName=\"url\" id=\"69388ece-e0fa-42a7-a2df-98c93f7ccc72\"/>\n                </cell>\n            </rows>\n            <rows capacity=\"2\">\n                <cell colspan=\"1\" contentType=\"Control\">\n                    <attrs/>\n                    <content xsi:type=\"control\" dataFieldName=\"YouJian\" id=\"9d68bd83-2e01-4ef9-bbb1-145c0473e571\"/>\n                </cell>\n                <cell colspan=\"1\" contentType=\"Control\">\n                    <attrs/>\n                    <content xsi:type=\"control\" dataFieldName=\"TuPian\" id=\"5d0d0804-972f-4928-bb8d-a057324b22b5\"/>\n                </cell>\n            </rows>\n            <rows capacity=\"2\">\n                <cell colspan=\"1\" contentType=\"Control\">\n                    <attrs/>\n                    <content xsi:type=\"control\" dataFieldName=\"ShiJianChuo\" id=\"8f125e11-fc1e-4804-9998-2ba4e59a686f\"/>\n                </cell>\n                <cell colspan=\"1\" contentType=\"Control\">\n                    <attrs/>\n                    <content xsi:type=\"control\" dataFieldName=\"ShiFu\" id=\"d527e368-4d80-4584-a3ee-67b04c5ba435\"/>\n                </cell>\n            </rows>\n            <rows capacity=\"2\">\n                <cell colspan=\"1\" contentType=\"Control\">\n                    <attrs/>\n                    <content xsi:type=\"control\" dataFieldName=\"BaiFenBi\" id=\"8a883a6c-84c5-4be3-b4fc-0207534b719e\"/>\n                </cell>\n                <cell colspan=\"1\" contentType=\"Control\">\n                    <attrs/>\n                    <content xsi:type=\"control\" dataFieldName=\"DuoXuanXiang\" id=\"eb3e9710-6f7c-4312-bace-d85304551d06\"/>\n                </cell>\n            </rows>\n            <rows capacity=\"2\">\n                <cell colspan=\"1\" contentType=\"Control\">\n                    <attrs/>\n                    <content xsi:type=\"control\" dataFieldName=\"FuDianShu\" id=\"ecd9f94a-d387-4b61-ae01-10a11bf60947\"/>\n                </cell>\n                <cell colspan=\"1\" contentType=\"Control\">\n                    <attrs/>\n                    <content xsi:type=\"control\" dataFieldName=\"HuoBi\" id=\"06d6ffdb-ffe3-4221-829c-40b95c3eac5d\"/>\n                </cell>\n            </rows>\n            <rows capacity=\"2\">\n                <cell colspan=\"1\" contentType=\"Control\">\n                    <attrs/>\n                    <content xsi:type=\"control\" dataFieldName=\"RiQiShiJian\" id=\"ba83d161-b02c-481b-bf84-60bcf018ad48\"/>\n                </cell>\n                <cell colspan=\"1\" contentType=\"Control\">\n                    <attrs/>\n                    <content xsi:type=\"control\" dataFieldName=\"ZhengShu\" id=\"40d891ab-e14c-4177-b80e-a378f84710d8\"/>\n                </cell>\n            </rows>\n            <rows capacity=\"2\">\n                <cell colspan=\"1\" contentType=\"Control\">\n                    <attrs/>\n                    <content xsi:type=\"control\" dataFieldName=\"DanXuanXiang\" id=\"d44a0d15-6fde-4522-a3a7-3842f2008c6d\"/>\n                </cell>\n                <cell colspan=\"1\" contentType=\"Control\">\n                    <attrs/>\n                    <content xsi:type=\"control\" dataFieldName=\"ShuZi\" id=\"ff6ec58d-a89f-45d9-8a43-366058c31543\"/>\n                </cell>\n            </rows>\n        </section>\n    </sections>\n</form>','form_template_workflow','<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<div th:id=\"${viewId}\">\n  <form class=\"form-horizontal ajaxpost\" data-widget=\"validator\"\n    id=\"entityForm\" method=\"post\" th:action=\"${requestUrl}\" th:object=\"${entity}\">\n    <div class=\"portlet box tea-green\">\n      <div class=\"portlet-title\">\n        <div class=\"caption\">\n          <i class=\"icon-reorder\"/>\n          <span>test</span>\n        </div>\n        <div class=\"tools\">\n          <a class=\"collapse\" href=\"javascript:;\"/>\n          <!-- <a href=\"javascript:;\" class=\"reload\"></a> -->\n        </div>\n      </div>\n      <div class=\"portlet-body form-bordered\">\n        <table class=\"form-table col4-fluid\">\n          <tr>\n            <th>\n              <label>名称：</label>\n            </th>\n            <td colspan=\"1\">\n              <input meta:field=\"name\"/>\n            </td>\n            <th>\n              <label>文本：</label>\n            </th>\n            <td colspan=\"1\">\n              <input meta:field=\"WenBen\"/>\n            </td>\n          </tr>\n          <tr>\n            <th>\n              <label>日期：</label>\n            </th>\n            <td colspan=\"1\">\n              <input meta:field=\"RiQi\"/>\n            </td>\n            <th>\n              <label/>\n            </th>\n            <td colspan=\"1\">\n              <span/>\n            </td>\n          </tr>\n          <tr>\n            <th>\n              <label>富文本：</label>\n            </th>\n            <td colspan=\"3\">\n              <input meta:field=\"FuWenBen\"/>\n            </td>\n          </tr>\n          <tr>\n            <th>\n              <label>代码：</label>\n            </th>\n            <td colspan=\"1\">\n              <input meta:field=\"DaiMa\"/>\n            </td>\n            <th>\n              <label>多行文本：</label>\n            </th>\n            <td colspan=\"1\">\n              <input meta:field=\"DuoXingWenBen\"/>\n            </td>\n          </tr>\n          <tr>\n            <th>\n              <label>文件上传：</label>\n            </th>\n            <td colspan=\"1\">\n              <input meta:field=\"WenJianShangChuan\"/>\n            </td>\n            <th>\n              <label>url：</label>\n            </th>\n            <td colspan=\"1\">\n              <input meta:field=\"url\"/>\n            </td>\n          </tr>\n          <tr>\n            <th>\n              <label>邮件：</label>\n            </th>\n            <td colspan=\"1\">\n              <input meta:field=\"YouJian\"/>\n            </td>\n            <th>\n              <label>图片：</label>\n            </th>\n            <td colspan=\"1\">\n              <input meta:field=\"TuPian\"/>\n            </td>\n          </tr>\n          <tr>\n            <th>\n              <label>时间戳：</label>\n            </th>\n            <td colspan=\"1\">\n              <input meta:field=\"ShiJianChuo\"/>\n            </td>\n            <th>\n              <label>是否：</label>\n            </th>\n            <td colspan=\"1\">\n              <input meta:field=\"ShiFu\"/>\n            </td>\n          </tr>\n          <tr>\n            <th>\n              <label>百分比：</label>\n            </th>\n            <td colspan=\"1\">\n              <input meta:field=\"BaiFenBi\"/>\n            </td>\n            <th>\n              <label>多选项：</label>\n            </th>\n            <td colspan=\"1\">\n              <input meta:field=\"DuoXuanXiang\"/>\n            </td>\n          </tr>\n          <tr>\n            <th>\n              <label>浮点数：</label>\n            </th>\n            <td colspan=\"1\">\n              <input meta:field=\"FuDianShu\"/>\n            </td>\n            <th>\n              <label>货币：</label>\n            </th>\n            <td colspan=\"1\">\n              <input meta:field=\"HuoBi\"/>\n            </td>\n          </tr>\n          <tr>\n            <th>\n              <label>日期时间：</label>\n            </th>\n            <td colspan=\"1\">\n              <input meta:field=\"RiQiShiJian\"/>\n            </td>\n            <th>\n              <label>整数：</label>\n            </th>\n            <td colspan=\"1\">\n              <input meta:field=\"ZhengShu\"/>\n            </td>\n          </tr>\n          <tr>\n            <th>\n              <label>单选项：</label>\n            </th>\n            <td colspan=\"1\">\n              <input meta:field=\"DanXuanXiang\"/>\n            </td>\n            <th>\n              <label>数字：</label>\n            </th>\n            <td colspan=\"1\">\n              <input meta:field=\"ShuZi\"/>\n            </td>\n          </tr>\n        </table>\n      </div>\n    </div>\n  </form>\n  <script th:inline=\"javascript\" type=\"text/javascript\">\n	//<![CDATA[ \n		$(function(){\n			var viewId=/*[[${viewId}]]*/;\n			var container=$(\'#\' + viewId);\n			Page.init(container);\n		});\n	//]]></script>\n</div>',NULL,1,10,'form',NULL,'test/workflow',NULL,NULL,NULL,'');
