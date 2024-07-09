<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $role = Role::all();

        return Inertia::render('Roles/Index', [
            'role' => $role,
        ]);
    }

    public function create()
    {
        return Inertia::render('Roles/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'unique:role,name']
        ]);

        Role::create([
            'name' => $request->name
        ]);

        return Redirect::route('role.index');
    }

    public function edit(Role $role)
    {
        return Inertia::render('Roles/Edit', [
            'role' => $role
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => ['required', 'string', 'unique:role,name,' . $role->id]
        ]);

        $role->update([
            'name' => $request->name
        ]);

        return Redirect::route('role.index');
    }

    public function destroy(Request $request)
    {
        Role::destroy($request->role);

        return Redirect::route('role.index');
    }
}
