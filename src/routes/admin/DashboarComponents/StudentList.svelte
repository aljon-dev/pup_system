<script lang="ts">

import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

let { data } = $props();

</script>


<Table>
    <TableHead>
      <TableHeadCell>First Name</TableHeadCell>
      <TableHeadCell>Last Name</TableHeadCell>
      <TableHeadCell>Student Number</TableHeadCell>
      <TableHeadCell>Email</TableHeadCell>
      
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each  data.students  ?? [] as student}
      <TableBodyRow>
        <TableBodyCell>{student.first_name}</TableBodyCell>
        <TableBodyCell>{student.last_name}</TableBodyCell>
        <TableBodyCell>{student.student_number}</TableBodyCell>
        <TableBodyCell>{student.email}</TableBodyCell>
      </TableBodyRow>
      {/each}
    </TableBody>
  </Table>

