<script lang="ts">

import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

let { data } = $props();

</script>


<Table>
    <TableHead>
      <TableHeadCell>First Name</TableHeadCell>
      <TableHeadCell>Last Name</TableHeadCell>
      <TableHeadCell>Residency </TableHeadCell>
      <TableHeadCell>Email</TableHeadCell>
      <TableHeadCell>Actions</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">

        {#each  data.studentsRegister  ?? [] as student}

      <TableBodyRow>
        <TableBodyCell>{student.firstname}</TableBodyCell>
        <TableBodyCell>{student.lastname}</TableBodyCell>
        <TableBodyCell>{student.Details.residency} Years</TableBodyCell>
        <TableBodyCell>{student.emailAddress}</TableBodyCell>
        <TableBodyCell>
          

          <Button color="blue"  onclick={() => alert(student.user_id) } size="sm">View</Button>

          <Button color="red" size="sm">Delete</Button>


        </TableBodyCell>
      </TableBodyRow>
      {/each}
    </TableBody>
  </Table>

