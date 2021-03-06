package com.mcg.apitester.example.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.mcg.apitester.api.annotations.ApiDescription;
import com.mcg.apitester.api.annotations.ApiError;
import com.mcg.apitester.api.annotations.ApiErrors;
import com.mcg.apitester.api.annotations.ApiHeader;
import com.mcg.apitester.api.annotations.ApiHeaders;
import com.mcg.apitester.example.entities.OneEntity;

@RestController
@RequestMapping(value="/api")
public class TwoController {

	@RequestMapping(value="/two/entities",method=RequestMethod.GET)
	@ApiHeaders(value= {@ApiHeader(name="contextKey",description="the context key")})
	public List<OneEntity> list(
			@RequestParam String x, 
			@RequestParam  String y, 
			@RequestParam(required=false,defaultValue="0") @ApiDescription("Pagination: The offset") int offset, 
			@RequestParam(required=false,defaultValue="25") @ApiDescription("Pagination: The maximum number of entries per page") int max, 
			@RequestParam @ApiDescription("The field to order by. One of 'name', 'date' or 'size'") String orderBy) {
		List<OneEntity> e = new ArrayList<>();
		e.add(BaseController.create(OneEntity.class));
		e.add(BaseController.create(OneEntity.class));
		e.add(BaseController.create(OneEntity.class));
		e.add(BaseController.create(OneEntity.class));
		e.add(BaseController.create(OneEntity.class));
		e.add(BaseController.create(OneEntity.class));
		return e; 
	}

	@RequestMapping(value="/two/entities/{id}",method=RequestMethod.GET)
	public OneEntity get(
			@PathVariable @ApiDescription("The ID of the entity to read") String id, 
			@RequestParam String y, 
			@RequestParam int offset, 
			@RequestParam int max, 
			@RequestParam String orderBy) {
		return BaseController.create(OneEntity.class);
	}
	
	@RequestMapping(value="/two/entities",method=RequestMethod.POST)
	public OneEntity create(@RequestBody OneEntity body) {
		return BaseController.create(OneEntity.class);
	}
	
	@RequestMapping(value="/two/same_name/{foo}",method=RequestMethod.GET)
	public OneEntity getWithTwoParams(@PathVariable(name="foo") String foo1, @RequestParam(name="foo") String foo2) {
		return BaseController.create(OneEntity.class);
	}
	
		
}
