import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../components/ui/breadcrumb"
import { createLazyFileRoute } from "@tanstack/react-router"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Label } from "../components/ui/label"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog'
import { useEffect, useState } from "react"
import { employeeApiService } from "../service/api"


const Employees = () => {
    const [employees, setEmployees] = useState<any>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [allEmployees, setAllEmployees] = useState<any>([]);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<any>('');

    const fetchEmployees = () => {
        employeeApiService.getAllEmployees()
            .then(response => {
                setEmployees(response.data);
                setAllEmployees(response.data);
                // console.log(response.data)
            })
            .catch(error => console.error('There was an error fetching the employees:', error));
    };

    useEffect(() => {
        fetchEmployees();
    }, []);


    const handleSearch = () => {
        // If search term is empty, refetch all employees to reset the list
        if (!searchTerm) {
            setEmployees(allEmployees)
            return;
        }

        const lowercasedFilter = searchTerm.toLowerCase();
        const filteredEmployees = allEmployees.filter((employee: any) => {
            return (
                employee.codeEmployee.toString().includes(lowercasedFilter) ||
                employee.firstName.toLowerCase().includes(lowercasedFilter) ||
                employee.lastName.toLowerCase().includes(lowercasedFilter) ||
                employee.job.toLowerCase().includes(lowercasedFilter)
            );
        });

        setEmployees(filteredEmployees);
    };

    const [newEmployee, setNewEmployee] = useState({ firstName: '', lastName: '', job: '' });

    const handleAddEmployee = (e: any) => {
        e.preventDefault(); // Prevent form submission default behavior
        employeeApiService.createEmployee(newEmployee)
            .then(() => {
                // Optionally reset the form
                setNewEmployee({ firstName: '', lastName: '', job: '' });
                // Refetch the employee list to show the new employee
                return employeeApiService.getAllEmployees();
            })
            .then(response => {
                setEmployees(response.data);
                console.log(response.data)
                fetchEmployees();
            })
            .catch(error => console.error('There was an error adding the employee:', error));
    };

    const handleDeleteEmployee = (codeEmployee: number) => {
        employeeApiService.deleteEmployee(codeEmployee)
            .then(() => {
                // Optionally: Refetch or update local employee list
                fetchEmployees();
            })
            .catch(error => console.error('Error deleting employee:', error));
    };

    // Before your return statement, prepare a function to handle the edit button click
    const handleEditClick = (employee: any) => {
        setSelectedEmployee(employee);
        setIsEditDialogOpen(true);
    };

    const handleUpdateEmployee = (e: any) => {
        e.preventDefault(); // Prevent default form submission
        if (!selectedEmployee) return;
        employeeApiService.updateEmployee(selectedEmployee.codeEmployee, selectedEmployee)
            .then(() => {
                setIsEditDialogOpen(false); // Close the dialog
                // Optionally: Refetch or update local employee list
                fetchEmployees();
            })
            .catch(error => console.error('Error updating employee:', error));
    };


    return (
        <div className="p-2">
            <div className="flex items-center px-4 w-full h-12 bg-gray-100 rounded-lg">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Employées</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="px-[10%] py-[5%] space-y-[5%]">
                <h1 className="text-4xl font-extrabold">Employées</h1>
                <p>On pourra ajouter, modifier, supprimer et lister tous les Employées ici.</p>
                <div className="border border-gray-200 " />
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <h1 className="text-lg font-bold">Employées</h1>
                        <div className="flex gap-4">
                            {/* search employee by code or firstName or lastName input  */}
                            <div className="flex w-full max-w-sm items-center space-x-2">
                                <Input type="text" placeholder="Rechercher par code ou nom ou prénom" value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value); handleSearch()
                                    }} />
                                {/* <Button type="submit" onClick={handleSearch}>Rechercher</Button> */}
                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="secondary">Ajouter</Button>
                                </DialogTrigger>
                                {/* create employee dialog section */}
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Ajouter un Employé</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Nom:
                                            </Label>
                                            <Input id="name" className="col-span-3" value={newEmployee.lastName} onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })} placeholder="Entrer le nom" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">
                                                Prénoms:
                                            </Label>
                                            <Input id="username" className="col-span-3" value={newEmployee.firstName} onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })} placeholder="Entrer les prénoms" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">
                                                Poste:
                                            </Label>
                                            <Input id="username" className="col-span-3" value={newEmployee.job} onChange={(e) => setNewEmployee({ ...newEmployee, job: e.target.value })} placeholder="Entrer le poste" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" onClick={handleAddEmployee}>Ajouter</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <Table>
                        <TableCaption className="text-left">Liste des Employées</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Code</TableHead>
                                <TableHead className="bg-gray-200/50 rounded-t-sm">Nom</TableHead>
                                <TableHead>Prénoms</TableHead>
                                <TableHead className="bg-gray-200/50 rounded-t-sm">Poste</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* List of all employees */}

                            {Array.isArray(employees) && employees.map((employee: any, i: number) => (
                                <TableRow key={i}>
                                    <TableCell className="font-bold">{employee.codeEmployee}</TableCell>
                                    <TableCell className="bg-gray-200/50">{employee.firstName}</TableCell>
                                    <TableCell>{employee.lastName}</TableCell>
                                    <TableCell className="bg-gray-200/50">{employee.job}</TableCell>
                                    <TableCell className="space-x-4 w-[25%]">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button className="bg-blue-500 hover:bg-blue-600 duration-300" onClick={() => handleEditClick(employee)}>Modifier</Button>
                                            </DialogTrigger>
                                            {/* update employee dialog section */}
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Modifier un employé</DialogTitle>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="name" className="text-right">
                                                            Nom:
                                                        </Label>
                                                        <Input
                                                            id="edit-lastName"
                                                            className="col-span-3"
                                                            placeholder="Entrer Nom"
                                                            value={selectedEmployee ? selectedEmployee.lastName : ''}
                                                            onChange={(e) => setSelectedEmployee({ ...selectedEmployee, lastName: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="name" className="text-right">
                                                            Prénoms:
                                                        </Label>
                                                        <Input
                                                            id="edit-firstName"
                                                            className="col-span-3"
                                                            placeholder="Entrer Prénoms"
                                                            value={selectedEmployee ? selectedEmployee.firstName : ''}
                                                            onChange={(e) => setSelectedEmployee({ ...selectedEmployee, firstName: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="name" className="text-right">
                                                            Poste:
                                                        </Label>
                                                        <Input
                                                            id="edit-job"
                                                            className="col-span-3"
                                                            placeholder="Entrer Poste"
                                                            value={selectedEmployee ? selectedEmployee.job : ''}
                                                            onChange={(e) => setSelectedEmployee({ ...selectedEmployee, job: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit" onClick={handleUpdateEmployee}>Modifier</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        {/* Alert dialog for Deleting employee row */}
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive">Supprimer</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Voulez-vous vraiment supprimer {employee.codeEmployee} ?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Cette action est irreversible.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDeleteEmployee(employee.codeEmployee)}>Supprimer</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export const Route = createLazyFileRoute('/')({
    component: Employees,
})

