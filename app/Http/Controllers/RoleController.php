<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:view roles', ['only' => ['index']]);
        $this->middleware('permission:create roles', ['only' => ['create', 'store']]);
        $this->middleware('permission:edit roles', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete roles', ['only' => ['destroy']]);
    }

    public function index()
    {
        $roles = Role::all();

        return Inertia::render('Roles/Index', [
            'roles' => $roles,
        ]);
    }

    public function create()
    {
        return Inertia::render('Roles/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'unique:roles,name']
        ]);

        Role::create([
            'name' => $request->name
        ]);

        return Redirect::route('roles.index');
    }

    public function edit(Role $role)
    {
        $hasPermissions = $role->getAllPermissions();
        $permissions = Permission::get();

        return Inertia::render('Roles/Edit', [
            'role' => $role,
            'hasPermissions' => $hasPermissions,
            'permissions' => $permissions
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => ['required', 'string', 'unique:roles,name,' . $role->id],
            'permissions' => ['required', 'array']
        ]);

        $role->update([
            'name' => $request->name
        ]);

        $role->syncPermissions($request->permissions);

        return Redirect::route('roles.index');
    }

    public function destroy(Request $request)
    {
        Role::destroy($request->role);

        return Redirect::route('roles.index');
    }

    public function show(Role $role)
    {
        $permissions = Permission::get();
        $roleHasPermissions = DB::table("role_has_permissions as rhp")
            ->join("permissions as p", "rhp.permission_id", "=", "p.id")
            ->where("rhp.role_id", $role->id)
            ->select("rhp.permission_id", "rhp.role_id", 'p.name as permission_name')
            ->get();

        return Inertia::render('Roles/Show', [
            'role' => $role,
            'permissions' => $permissions,
            'roleHasPermissions' => $roleHasPermissions
        ]);
    }

    public function updatePermissions(Request $request, $roleId)
    {
        $request->validate([
            'permissions' => ['required', 'array']
        ]);

        $role = Role::findOrFail($roleId);
        $role->syncPermissions($request->permissions);

        return Redirect::back();
    }
}
