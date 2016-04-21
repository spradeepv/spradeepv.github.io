function createSubGrid() {
	var myGrid = jQuery("#grid");
	myGrid.jqGrid({
		url : 'data/interfaces.json',
		datatype : 'json',
		jsonReader : {
			root : "rows",
			page : "currpage",
			total : "totalpages",
			records : "totalrecords",
			cell : "",
			id : "0"
		},
		mtype : 'GET',
		colNames : [ 'ID','Moname', 'Description', 'Name', 'Type', 'IPaddress / Netmask', 'QOS Name', 'Oper / Admin Status' ],
		colModel : [{name : 'id', index : 'id', width : 10, align : 'center', hidden : true, search : true},
		            {name : 'getObjectID', index : 'getObjectID', width : 160, align : 'center', hidden : true, search : true},
		            {name : 'getDescription', index : 'getDescription', align : 'center' },
		            {name : 'Name', index : 'Name', align : 'center'},
		            {name : 'Type', index : 'Type', align : 'center'},
		            {name : 'IpAddress', index : 'IpAddress', align : 'center'},
		            {name : 'PolicyName', index : 'PolicyName', align : 'center'},
		            {name : 'Oper/Admin', index : 'Oper/Admin', align : 'center'}],
		pager : '#gridPager',
		rowNum : 20,
		rowList : [ 20, 30, 50 ],
		sortname : 'name',
		sortorder : 'asc',
		viewrecords : true,
		gridview : true,
		hidegrid : false,
		caption : 'Interface Table',
		autowidth : true,
		loadonce: true,
		//shrinkToFit : true,
		height : 260,
		pginput : false,
		subGrid : true,
		subGridRowExpanded: function(subgrid_id, row_id) {
			   var subgrid_table_id;
			   subgrid_table_id = subgrid_id+"_t";
			   jQuery("#"+subgrid_id).html("<table id='"+subgrid_table_id+"' class='scroll'></table><div id='ctpPager'>");
			   jQuery("#"+subgrid_table_id).jqGrid({
			      url:"data/subInterfaces.json",
			      datatype: "json",
			      jsonReader : {
						root : "rows",
						page : "currpage",
						total : "totalpages",
						records : "totalrecords",
						cell : "",
						id : "0",
			      },
			      colNames: ['Object ID','Description','Name','Type','IpAddress','PolicyName','Oper/Admin Status'],
			      colModel: [
			        {name : 'getObjectID',index : 'getObjectID',width : 160,align : 'center',hidden : true,search : true}, 
			        {name : 'getDescription',index : 'getDescription',align : 'center'},
			        {name : 'Name',index : 'Name',align : 'center'}, 
			        {name : 'Type',index : 'Type',align : 'center'}, 
			        {name : 'IpAddress',index : 'IpAddress',align : 'center'}, 
			        {name : 'PolicyName',index : 'PolicyName',align : 'center'}, 
			        {name : 'Oper/Admin',index : 'Oper/Admin',align : 'center'}           
			      ],
			      pager : '#ctpPager',
			      height: '100%',
			      rowNum:20,
			      sortname: 'Name',
			      sortorder: "asc",
			      pginput: false,
			      caption: 'Sub-Interface Table'
			   });
		},
		loadComplete: function () {
	        jQuery("#grid").jqGrid('setGridParam', { datatype: 'local' });
	    },
	});
	jQuery("#grid").jqGrid('navGrid', '#gridPager', {
		add : false,
		edit : false,
		del : false,
		search : true,
		refresh: true
	});

	jQuery("#grid").jqGrid(
			'navButtonAdd',
			'#gridPager',
			{
				caption : "CSV",
				onClickButton : function() {
					alert("Call your own method to create a csv file");
				}
			});
	jQuery("#grid").jqGrid(
			'navButtonAdd',
			'#gridPager',
			{
				caption : "PDF",
				onClickButton : function() {
					alert("Call your own method to create a pdf file");
				}
			});
	jQuery("#grid").jqGrid(
			'navButtonAdd',
			'#gridPager',
			{
				caption : "XLS",
				onClickButton : function() {
					alert("Call your own method to create a xls file");
				}
			});
	
	$("#grid").closest(".ui-jqgrid-bdiv").attr("style",
	$("#grid").closest(".ui-jqgrid-bdiv").attr("style") + " overflow-y: scroll; ");
}
