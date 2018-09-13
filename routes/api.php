<?php

use Illuminate\Http\Request;


Route::post('register', 'Auth\AuthController@register')->name('register');
Route::post('login', 'Auth\AuthController@login')->name('login');
Route::get('/user', 'Auth\AuthController@user');
Route::post('/logout', 'Auth\AuthController@logout');