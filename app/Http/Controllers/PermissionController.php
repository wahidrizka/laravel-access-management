<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        return Inertia::render('Permissions/Index');
    }

    public function create()
    {
        return Inertia::render('Permissions/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'unique:permissions,name']
        ]);

        Permission::create([
            'name' => $request->name
        ]);

        return redirect()->route('permissions.create')->with([
            'flash' => [
                'type' => 'success',
                'message' => 'Permission created successfully'
            ]
        ]);
    }

    public function edit()
    {
    }

    public function update()
    {
    }

    public function destroy()
    {
    }
}
